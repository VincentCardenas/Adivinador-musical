-- ════════════════════════════════════════════════════════════════════
--  Ranking global del Adivinador musical (Supabase / PostgreSQL)
--
--  Cómo usarlo: en tu proyecto de Supabase abre "SQL Editor" → "New query",
--  pega TODO este archivo y dale "Run". Se puede correr más de una vez.
--
--  Qué hace:
--   - Crea la tabla `scores` con reglas que rechazan datos imposibles
--     (nicknames raros, puntajes más altos de lo que permite cada modo, etc.).
--   - Activa Row Level Security: cualquiera puede LEER el ranking y AGREGAR
--     su puntaje, pero nadie puede editar ni borrar desde el juego.
--     (Tú sí puedes borrar filas desde el panel de Supabase → Table Editor.)
--   - Evita spam: el mismo nickname no puede guardar dos puntajes en menos de 20 s.
--   - Bloquea nicknames ofensivos (función nick_ofensivo) y borra los puntajes que ya los tengan.
-- ════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

create table if not exists public.scores (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  nick        text not null,
  tema        text not null,
  modo        text not null,
  puntos      integer not null,
  aciertos    integer not null,
  rondas      integer not null,
  racha       integer not null default 0,
  version     text,

  constraint nick_valido check (
    char_length(nick) between 2 and 16
    and nick ~ '^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ _.-]+$'
    and nick ~ '[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ]'
  ),
  constraint tema_valido check (tema in ('juegos', 'series', 'caricaturas', 'anime', 'disney', 'musicales', 'canciones')),
  constraint modo_valido check (modo in ('clasico', 'experto', 'supervivencia')),
  constraint numeros_validos check (
    puntos >= 0 and aciertos >= 0 and rondas >= 1 and racha >= 0
    and aciertos <= rondas and racha <= aciertos
  ),
  -- Topes por modo: Clásico y Supervivencia dan como máximo 400 puntos por acierto
  -- (200 de base × racha x2); Experto, 500. Clásico y Experto duran 10 rondas.
  -- En Supervivencia puedes fallar 3 veces, más una por cada ronda bonus (1 de cada 5 rondas):
  -- acertarla te devuelve una vida y fallarla no te la quita (desde la v1.9.4).
  constraint puntaje_posible check (
    (modo = 'clasico'       and rondas <= 10 and puntos <= aciertos * 400) or
    (modo = 'experto'       and rondas <= 10 and puntos <= aciertos * 500) or
    (modo = 'supervivencia' and rondas - aciertos <= 3 + rondas / 5 and puntos <= aciertos * 400)
  ),
  constraint version_corta check (version is null or char_length(version) <= 30)
);

-- Temas válidos. `create table if not exists` no toca una tabla que ya existe, así que la lista
-- se vuelve a poner aquí: al correr este archivo en un proyecto viejo, la base acepta los temas
-- nuevos (por ejemplo, 'musicales' desde la v1.8).
alter table public.scores drop constraint if exists tema_valido;
alter table public.scores add constraint tema_valido
  check (tema in ('juegos', 'series', 'caricaturas', 'anime', 'disney', 'musicales', 'canciones'));

-- Actualizar la constraint de la longitud de la versión en bases existentes.
alter table public.scores drop constraint if exists version_corta;
alter table public.scores add constraint version_corta
  check (version is null or char_length(version) <= 30);

-- Topes de puntaje en bases existentes. Desde la v1.9.4, Supervivencia tiene rondas bonus
-- (las rondas 5, 10, 15…) y se puede fallar más de 3 veces: hay que volver a correr este archivo.
alter table public.scores drop constraint if exists puntaje_posible;
alter table public.scores add constraint puntaje_posible check (
  (modo = 'clasico'       and rondas <= 10 and puntos <= aciertos * 400) or
  (modo = 'experto'       and rondas <= 10 and puntos <= aciertos * 500) or
  (modo = 'supervivencia' and rondas - aciertos <= 3 + rondas / 5 and puntos <= aciertos * 400)
);

-- Nicknames ofensivos (desde la v1.9.5-hotfix1): insultos racistas, homofóbicos o de odio y groserías
-- fuertes. Es la misma regla que js/scores.js (isOffensive): si cambias una lista, cambia la otra
-- (scripts/validate-nick-filter.js revisa que coincidan). El nickname se compara en minúsculas, sin acentos,
-- separando las palabras pegadas con mayúscula ("ElPutoAmo" → "el puto amo") y leyendo 0 1 3 4 5 7 como
-- o i e a s t. `palabras` solo cuentan como palabra completa ("Computadora" o "Maricarmen" sí se valen);
-- `pegadas` cuentan aunque vayan dentro de otra palabra, con letras repetidas o separadas por puntos.
create or replace function public.nick_ofensivo(nick text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select (' ' || btrim(regexp_replace(a.t, '[^a-z]+', ' ', 'g')) || ' ') ~ r.palabras
      or (' ' || btrim(regexp_replace(b.l, '[^a-z]+', ' ', 'g')) || ' ') ~ r.palabras
      or regexp_replace(b.l, '[^a-z]+', '', 'g') ~ r.pegadas
  from (select translate(lower(regexp_replace(coalesce(nick, ''), '([a-záéíóúüñ])([A-ZÁÉÍÓÚÜÑ])', '\1 \2', 'g')),
                         'ÁÉÍÓÚÜÑáéíóúüñ', 'aeiouunaeiouun') as t) a
  cross join lateral (select translate(a.t, '013457', 'oieast') as l) b
  cross join (select
    ' (p+u+t+[oa]+s*|p+u+t+i+t+[oa]+s*|j+o+t+o+s*|m+a+r+i+c+a+s*|v+e+r+g+a+s*|c+u+l+o+s*|c+h+i+n+g+[aeu]+s*|f+a+g+s*|c+u+n+t+s*|s+h+i+t+(s+|t+y+)?|s+p+i+c+s*|c+h+i+n+k+s*|g+o+o+k+s*|c+o+o+n+s*|n+a+z+i+s*|h+e+i+l+|k+k+k+|r+a+p+e+|r+a+p+i+s+t+s*|r+e+t+a+r+d+(e+d+)?s*|m+a+y+a+t+e+s*|t+r+o+l+o+s*|h+d+p+|p+t+m+) '::text as palabras,
    '(n+[iy]+g+g+|f+a+g+g+o+t+|m+a+r+i+c+o+n+|n+e+g+r+a+t+a+|s+u+d+a+c+a+|b+e+a+n+e+r+|w+e+t+b+a+c+k+|t+r+a+n+n+y+|h+i+t+l+e+r+|s+i+e+g+h+e+i+l+|w+h+i+t+e+p+o+w+e+r+|k+u+k+l+u+x+|f+u+c+k+|b+u+l+l+s+h+i+t+|s+h+i+t+h+e+a+d+|b+i+t+c+h+|w+h+o+r+e+|s+l+u+t+|p+u+s+s+y+|p+o+r+n+|a+s+s+h+o+l+e+|c+o+c+k+s+u+c+k+|d+i+c+k+h+e+a+d+|p+e+n+d+e+j+|c+u+l+e+r+[oa]+|m+i+e+r+d+a+|c+h+i+n+g+a+d+|c+h+i+n+g+[aeu]+[st]+u+m+a+d+r+e+|h+i+j+[oa]+s*d+e+p+u+t+a+|h+i+j+u+e+p+u+t+[ao]+|p+u+t+a+m+a+d+r+e+|c+o+n+c+h+[ae]+t+u+m+a+d+r+e+|m+a+l+p+a+r+i+d+[oa]+|m+a+m+a+g+u+e+v+o+|g+i+l+i+p+o+l+l+a+s+|v+i+o+l+a+d+o+r+|p+e+d+o+f+i+l+|p+e+d+e+r+a+s+t+|s+u+b+n+o+r+m+a+l+|m+o+n+g+o+l+o+|s+i+d+o+s+[oa]+)'::text as pegadas) r
$$;

-- Los puntajes que ya tengan un nickname ofensivo se borran, y la regla impide guardar nuevos
-- (aunque alguien se salte el juego y mande el puntaje directo a la API).
delete from public.scores where public.nick_ofensivo(nick);
alter table public.scores drop constraint if exists nick_permitido;
alter table public.scores add constraint nick_permitido check (not public.nick_ofensivo(nick));

create index if not exists scores_ranking_idx on public.scores (tema, modo, puntos desc, created_at);
create index if not exists scores_nick_idx on public.scores (lower(nick), created_at desc);

-- Limpia el nickname, fija la fecha en el servidor y frena el spam.
create or replace function public.scores_antes_de_guardar()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.nick := btrim(regexp_replace(new.nick, '\s+', ' ', 'g'));
  new.created_at := now();
  if exists (
    select 1 from public.scores
    where lower(nick) = lower(new.nick)
      and created_at > now() - interval '20 seconds'
  ) then
    raise exception 'Espera unos segundos antes de guardar otro puntaje.';
  end if;
  return new;
end;
$$;

drop trigger if exists scores_antes_de_guardar on public.scores;
create trigger scores_antes_de_guardar
  before insert on public.scores
  for each row execute function public.scores_antes_de_guardar();

-- Permisos: leer y agregar, nada más.
alter table public.scores enable row level security;

drop policy if exists "Cualquiera puede ver el ranking" on public.scores;
create policy "Cualquiera puede ver el ranking"
  on public.scores for select
  to anon, authenticated
  using (true);

drop policy if exists "Cualquiera puede guardar su puntaje" on public.scores;
create policy "Cualquiera puede guardar su puntaje"
  on public.scores for insert
  to anon, authenticated
  with check (true);

revoke all on public.scores from anon, authenticated;
grant select, insert on public.scores to anon, authenticated;
