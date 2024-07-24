alter table "public"."clubs" add column "avatar_path" text;

alter table "public"."clubs" add column "socials" text[];

alter table "public"."clubs" alter column "id" set not null;

alter table "public"."news" drop column "thumbnail_url";

alter table "public"."news" add column "thumbnail_path" text;

alter table "public"."news" alter column "color" drop not null;

alter table "public"."news" alter column "id" set not null;

alter table "public"."news" alter column "lang" set not null;

alter table "public"."news" alter column "title" drop not null;

alter table "public"."news" alter column "title" set data type text using "title"::text;

alter table "public"."stats" drop column "thumbnail_url";

alter table "public"."stats" add column "thumbnail_path" text;

create policy "Allow ALL to admins"
on "public"."languages"
as permissive
for all
to authenticated
using (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text))
with check (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text));


create policy "Allow READ to everyone"
on "public"."languages"
as permissive
for select
to public
using (true);


create policy "Allow ALL to admins"
on "public"."news"
as permissive
for all
to authenticated
using (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text))
with check (("right"((( SELECT auth.jwt() AS jwt) ->> 'email'::text), 6) = '@admin'::text));


create policy "Allow READ for all users"
on "public"."news"
as permissive
for select
to public
using (true);



