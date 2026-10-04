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
  constraint tema_valido check (tema in ('juegos', 'series', 'caricaturas', 'disney', 'canciones')),
  constraint modo_valido check (modo in ('clasico', 'experto', 'supervivencia')),
  constraint numeros_validos check (
    puntos >= 0 and aciertos >= 0 and rondas >= 1 and racha >= 0
    and aciertos <= rondas and racha <= aciertos
  ),
  -- Topes por modo: Clásico y Supervivencia dan como máximo 400 puntos por acierto
  -- (200 de base × racha x2); Experto, 500. Clásico y Experto duran 10 rondas;
  -- en Supervivencia solo puedes fallar 3 veces.
  constraint puntaje_posible check (
    (modo = 'clasico'       and rondas <= 10 and puntos <= aciertos * 400) or
    (modo = 'experto'       and rondas <= 10 and puntos <= aciertos * 500) or
    (modo = 'supervivencia' and rondas <= aciertos + 3 and puntos <= aciertos * 400)
  ),
  constraint version_corta check (version is null or char_length(version) <= 12)
);

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
