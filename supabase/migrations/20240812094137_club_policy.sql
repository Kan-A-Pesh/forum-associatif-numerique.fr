alter table "public"."clubs" drop constraint "clubs_pkey";

drop index if exists "public"."clubs_pkey";

alter table "public"."clubs" drop column "slug";

alter table "public"."clubs" add column "id" text not null;

CREATE UNIQUE INDEX clubs_pkey ON public.clubs USING btree (id, lang);

alter table "public"."clubs" add constraint "clubs_pkey" PRIMARY KEY using index "clubs_pkey";

create policy "Allow ALL to Club Owners"
on "public"."clubs"
as permissive
for all
to authenticated
using ((id = ( SELECT ((auth.jwt() -> 'user_metadata'::text) ->> 'club'::text))))
with check ((id = ( SELECT ((auth.jwt() -> 'user_metadata'::text) ->> 'club'::text))));



