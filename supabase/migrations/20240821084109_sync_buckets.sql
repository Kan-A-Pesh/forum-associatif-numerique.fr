insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 20971520, '{"image/jpeg"}');

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('assets', 'assets', true, 20971520, '{"image/*"}');

create policy "Allow ALL to admins 1bqp9qb_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'assets'::text) AND ("right"(( SELECT auth.email() AS email), 6) = '@admin'::text)));


create policy "Allow ALL to admins 1bqp9qb_1"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'assets'::text) AND ("right"(( SELECT auth.email() AS email), 6) = '@admin'::text)));


create policy "Allow ALL to admins 1bqp9qb_2"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'assets'::text) AND ("right"(( SELECT auth.email() AS email), 6) = '@admin'::text)));


create policy "Allow ALL to admins 1bqp9qb_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'assets'::text) AND ("right"(( SELECT auth.email() AS email), 6) = '@admin'::text)));


create policy "Allow SELECT to everyone 1bqp9qb_0"
on "storage"."objects"
as permissive
for select
to public
using ((bucket_id = 'assets'::text));


create policy "Give users access to own folder 1ffg0oo_0"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_1"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_2"
on "storage"."objects"
as permissive
for update
to authenticated
using (((bucket_id = 'images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));


create policy "Give users access to own folder 1ffg0oo_3"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'images'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



