"use server";

interface Props {
    title: any;
    subtitle: any;
}

export default async function Title({ title, subtitle }: Props) {
    return (
        <div className="w-full text-center">
            <h2 className="text-6xl font-semibold mb-2">{title}</h2>
            <p className="text-xl text-purple-400">{subtitle}</p>
        </div>
    );
}
