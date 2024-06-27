create table "public"."cache" (
    "key" text not null,
    "value" text not null,
    "owner" uuid not null default auth.uid()
);


alter table "public"."cache" enable row level security;

CREATE UNIQUE INDEX cache_pkey ON public.cache USING btree (key);

alter table "public"."cache" add constraint "cache_pkey" PRIMARY KEY using index "cache_pkey";

grant delete on table "public"."cache" to "anon";

grant insert on table "public"."cache" to "anon";

grant references on table "public"."cache" to "anon";

grant select on table "public"."cache" to "anon";

grant trigger on table "public"."cache" to "anon";

grant truncate on table "public"."cache" to "anon";

grant update on table "public"."cache" to "anon";

grant delete on table "public"."cache" to "authenticated";

grant insert on table "public"."cache" to "authenticated";

grant references on table "public"."cache" to "authenticated";

grant select on table "public"."cache" to "authenticated";

grant trigger on table "public"."cache" to "authenticated";

grant truncate on table "public"."cache" to "authenticated";

grant update on table "public"."cache" to "authenticated";

grant delete on table "public"."cache" to "service_role";

grant insert on table "public"."cache" to "service_role";

grant references on table "public"."cache" to "service_role";

grant select on table "public"."cache" to "service_role";

grant trigger on table "public"."cache" to "service_role";

grant truncate on table "public"."cache" to "service_role";

grant update on table "public"."cache" to "service_role";

create policy "Allow ALL to Row Owner"
on "public"."cache"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = owner));


create policy "Allow READ to everyone"
on "public"."cache"
as permissive
for select
to public
using (true);



