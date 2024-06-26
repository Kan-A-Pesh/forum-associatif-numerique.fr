create table "public"."clubs" (
    "uuid" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "slug" character varying not null,
    "lang" smallint not null,
    "title" character varying not null,
    "category" bigint,
    "subtitle" character varying,
    "content" jsonb,
    "id" bigint
);


alter table "public"."clubs" enable row level security;

create table "public"."languages" (
    "created_at" timestamp with time zone not null default now(),
    "name" character varying not null,
    "id" smallint generated by default as identity not null
);


alter table "public"."languages" enable row level security;

create table "public"."news" (
    "uuid" bigint generated by default as identity not null,
    "created_at" timestamp with time zone not null default now(),
    "thumbnail_url" text,
    "title" character varying not null,
    "description" text,
    "start_time" timestamp with time zone,
    "end_time" timestamp with time zone,
    "metadata" json,
    "id" bigint,
    "lang" smallint
);


alter table "public"."news" enable row level security;

create table "public"."stats" (
    "uuid" bigint generated by default as identity not null,
    "lang" smallint not null,
    "created_at" timestamp with time zone not null default now(),
    "thumbnail_url" text,
    "number" character varying not null default 'N/A'::character varying,
    "title" character varying not null,
    "description" text,
    "id" bigint
);


alter table "public"."stats" enable row level security;

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (uuid);

CREATE UNIQUE INDEX languages_id_key ON public.languages USING btree (id);

CREATE UNIQUE INDEX languages_pkey ON public.languages USING btree (id);

CREATE UNIQUE INDEX news_pkey ON public.news USING btree (uuid);

CREATE UNIQUE INDEX news_uuid_key ON public.news USING btree (uuid);

CREATE UNIQUE INDEX stats_pkey ON public.stats USING btree (uuid);

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

alter table "public"."languages" add constraint "languages_pkey" PRIMARY KEY using index "languages_pkey";

alter table "public"."news" add constraint "news_pkey" PRIMARY KEY using index "news_pkey";

alter table "public"."stats" add constraint "stats_pkey" PRIMARY KEY using index "stats_pkey";

alter table "public"."clubs" add constraint "public_clubs_lang_fkey" FOREIGN KEY (lang) REFERENCES languages(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."clubs" validate constraint "public_clubs_lang_fkey";

alter table "public"."languages" add constraint "languages_id_key" UNIQUE using index "languages_id_key";

alter table "public"."news" add constraint "news_uuid_key" UNIQUE using index "news_uuid_key";

alter table "public"."news" add constraint "public_news_lang_fkey" FOREIGN KEY (lang) REFERENCES languages(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."news" validate constraint "public_news_lang_fkey";

alter table "public"."stats" add constraint "public_stats_lang_fkey" FOREIGN KEY (lang) REFERENCES languages(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."stats" validate constraint "public_stats_lang_fkey";

grant delete on table "public"."clubs" to "anon";

grant insert on table "public"."clubs" to "anon";

grant references on table "public"."clubs" to "anon";

grant select on table "public"."clubs" to "anon";

grant trigger on table "public"."clubs" to "anon";

grant truncate on table "public"."clubs" to "anon";

grant update on table "public"."clubs" to "anon";

grant delete on table "public"."clubs" to "authenticated";

grant insert on table "public"."clubs" to "authenticated";

grant references on table "public"."clubs" to "authenticated";

grant select on table "public"."clubs" to "authenticated";

grant trigger on table "public"."clubs" to "authenticated";

grant truncate on table "public"."clubs" to "authenticated";

grant update on table "public"."clubs" to "authenticated";

grant delete on table "public"."clubs" to "service_role";

grant insert on table "public"."clubs" to "service_role";

grant references on table "public"."clubs" to "service_role";

grant select on table "public"."clubs" to "service_role";

grant trigger on table "public"."clubs" to "service_role";

grant truncate on table "public"."clubs" to "service_role";

grant update on table "public"."clubs" to "service_role";

grant delete on table "public"."languages" to "anon";

grant insert on table "public"."languages" to "anon";

grant references on table "public"."languages" to "anon";

grant select on table "public"."languages" to "anon";

grant trigger on table "public"."languages" to "anon";

grant truncate on table "public"."languages" to "anon";

grant update on table "public"."languages" to "anon";

grant delete on table "public"."languages" to "authenticated";

grant insert on table "public"."languages" to "authenticated";

grant references on table "public"."languages" to "authenticated";

grant select on table "public"."languages" to "authenticated";

grant trigger on table "public"."languages" to "authenticated";

grant truncate on table "public"."languages" to "authenticated";

grant update on table "public"."languages" to "authenticated";

grant delete on table "public"."languages" to "service_role";

grant insert on table "public"."languages" to "service_role";

grant references on table "public"."languages" to "service_role";

grant select on table "public"."languages" to "service_role";

grant trigger on table "public"."languages" to "service_role";

grant truncate on table "public"."languages" to "service_role";

grant update on table "public"."languages" to "service_role";

grant delete on table "public"."news" to "anon";

grant insert on table "public"."news" to "anon";

grant references on table "public"."news" to "anon";

grant select on table "public"."news" to "anon";

grant trigger on table "public"."news" to "anon";

grant truncate on table "public"."news" to "anon";

grant update on table "public"."news" to "anon";

grant delete on table "public"."news" to "authenticated";

grant insert on table "public"."news" to "authenticated";

grant references on table "public"."news" to "authenticated";

grant select on table "public"."news" to "authenticated";

grant trigger on table "public"."news" to "authenticated";

grant truncate on table "public"."news" to "authenticated";

grant update on table "public"."news" to "authenticated";

grant delete on table "public"."news" to "service_role";

grant insert on table "public"."news" to "service_role";

grant references on table "public"."news" to "service_role";

grant select on table "public"."news" to "service_role";

grant trigger on table "public"."news" to "service_role";

grant truncate on table "public"."news" to "service_role";

grant update on table "public"."news" to "service_role";

grant delete on table "public"."stats" to "anon";

grant insert on table "public"."stats" to "anon";

grant references on table "public"."stats" to "anon";

grant select on table "public"."stats" to "anon";

grant trigger on table "public"."stats" to "anon";

grant truncate on table "public"."stats" to "anon";

grant update on table "public"."stats" to "anon";

grant delete on table "public"."stats" to "authenticated";

grant insert on table "public"."stats" to "authenticated";

grant references on table "public"."stats" to "authenticated";

grant select on table "public"."stats" to "authenticated";

grant trigger on table "public"."stats" to "authenticated";

grant truncate on table "public"."stats" to "authenticated";

grant update on table "public"."stats" to "authenticated";

grant delete on table "public"."stats" to "service_role";

grant insert on table "public"."stats" to "service_role";

grant references on table "public"."stats" to "service_role";

grant select on table "public"."stats" to "service_role";

grant trigger on table "public"."stats" to "service_role";

grant truncate on table "public"."stats" to "service_role";

grant update on table "public"."stats" to "service_role";

