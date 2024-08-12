drop policy "Allow READ for all users" on "public"."news";

revoke delete on table "public"."stats" from "anon";

revoke insert on table "public"."stats" from "anon";

revoke references on table "public"."stats" from "anon";

revoke select on table "public"."stats" from "anon";

revoke trigger on table "public"."stats" from "anon";

revoke truncate on table "public"."stats" from "anon";

revoke update on table "public"."stats" from "anon";

revoke delete on table "public"."stats" from "authenticated";

revoke insert on table "public"."stats" from "authenticated";

revoke references on table "public"."stats" from "authenticated";

revoke select on table "public"."stats" from "authenticated";

revoke trigger on table "public"."stats" from "authenticated";

revoke truncate on table "public"."stats" from "authenticated";

revoke update on table "public"."stats" from "authenticated";

revoke delete on table "public"."stats" from "service_role";

revoke insert on table "public"."stats" from "service_role";

revoke references on table "public"."stats" from "service_role";

revoke select on table "public"."stats" from "service_role";

revoke trigger on table "public"."stats" from "service_role";

revoke truncate on table "public"."stats" from "service_role";

revoke update on table "public"."stats" from "service_role";

alter table "public"."news" drop constraint "news_uuid_key";

alter table "public"."stats" drop constraint "public_stats_lang_fkey";

alter table "public"."stats" drop constraint "stats_pkey";

alter table "public"."clubs" drop constraint "clubs_pkey";

alter table "public"."news" drop constraint "news_pkey";

drop index if exists "public"."news_uuid_key";

drop index if exists "public"."stats_pkey";

drop index if exists "public"."clubs_pkey";

drop index if exists "public"."news_pkey";

drop table "public"."stats";

create table "public"."categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "lang" smallint not null,
    "name" text not null,
    "icon" text
);


alter table "public"."categories" enable row level security;

alter table "public"."clubs" drop column "id";

alter table "public"."clubs" drop column "uuid";

alter table "public"."clubs" alter column "category" set data type text using "category"::text;
alter table "public"."clubs" alter column "category" set data type uuid using "category"::uuid;

alter table "public"."clubs" alter column "slug" set data type text using "slug"::text;

alter table "public"."clubs" alter column "subtitle" set data type text using "subtitle"::text;

alter table "public"."clubs" alter column "title" set data type text using "title"::text;

alter table "public"."languages" add column "display_name" text;

alter table "public"."languages" add column "flag" text;

alter table "public"."news" drop column "uuid";

alter table "public"."news" alter column "id" set data type text using "id"::text;
alter table "public"."news" alter column "id" set data type uuid using "id"::uuid;

alter table "public"."news" alter column "id" set default gen_random_uuid();

alter table "public"."news" alter column "title" set not null;

CREATE UNIQUE INDEX categories_pkey ON public.categories USING btree (id, lang);

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (slug, lang);

CREATE UNIQUE INDEX news_pkey ON public.news USING btree (id, lang);

alter table "public"."categories" add constraint "categories_pkey" PRIMARY KEY using index "categories_pkey";

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."news" add constraint "news_pkey" PRIMARY KEY using index "news_pkey";

alter table "public"."clubs" add constraint "public_clubs_category_lang_fkey" FOREIGN KEY (category, lang) REFERENCES categories(id, lang) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."clubs" validate constraint "public_clubs_category_lang_fkey";

grant delete on table "public"."categories" to "anon";

grant insert on table "public"."categories" to "anon";

grant references on table "public"."categories" to "anon";

grant select on table "public"."categories" to "anon";

grant trigger on table "public"."categories" to "anon";

grant truncate on table "public"."categories" to "anon";

grant update on table "public"."categories" to "anon";

grant delete on table "public"."categories" to "authenticated";

grant insert on table "public"."categories" to "authenticated";

grant references on table "public"."categories" to "authenticated";

grant select on table "public"."categories" to "authenticated";

grant trigger on table "public"."categories" to "authenticated";

grant truncate on table "public"."categories" to "authenticated";

grant update on table "public"."categories" to "authenticated";

grant delete on table "public"."categories" to "service_role";

grant insert on table "public"."categories" to "service_role";

grant references on table "public"."categories" to "service_role";

grant select on table "public"."categories" to "service_role";

grant trigger on table "public"."categories" to "service_role";

grant truncate on table "public"."categories" to "service_role";

grant update on table "public"."categories" to "service_role";

create policy "Allow ALL to admins"
on "public"."categories"
as permissive
for all
to authenticated
using (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text))
with check (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text));


create policy "Allow READ to everyone"
on "public"."categories"
as permissive
for select
to public
using (true);


create policy "Allow ALL to admins"
on "public"."clubs"
as permissive
for all
to authenticated
using (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text))
with check (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text));


create policy "Allow READ to everyone"
on "public"."clubs"
as permissive
for select
to public
using (true);


create policy "Allow READ to everyone"
on "public"."news"
as permissive
for select
to public
using (true);



