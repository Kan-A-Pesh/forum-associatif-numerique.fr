"use server";

import { createClient } from "@/lib/supabase/agents/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Icon from "@/components/common/icon";
import { packLangs } from "@/lib/supabase/wrappers/languages";
import CategoryCard from "./_components/category-card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default async function CategoriesPage() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("categories").select("*");

    const categories = data && data.length > 0 ? await packLangs(data) : {};

    return (
        <section className="flex flex-col gap-y-4 p-4 md:p-8 lg:p-12 w-full max-w-4xl">
            <header className="mb-4">
                <h1 className="text-4xl font-bold text-white">Categories Editor</h1>
                <p className="text-white mt-2">Edit, create and delete clubs categories.</p>
                <Link href="/webmaster/categories/create" passHref>
                    <Button className="flex items-center gap-1 mt-4">
                        <Icon icon="plus" className="text-white" size={24} />
                        <span>Create new category</span>
                    </Button>
                </Link>
            </header>

            {error && <p className="text-red-500">{error.message}</p>}

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Icon</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(categories).map(([id, category]) => (
                        <CategoryCard key={id} categoryList={category} />
                    ))}
                </TableBody>
            </Table>
        </section>
    );
}
