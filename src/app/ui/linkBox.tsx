import Link from "next/link";

export default function LinkBox({ heading, text, link = "blank" }: { heading?: string, text?: string, link?: string }) {
    return (
        <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href={link}
            target="_blank"
        >
            <h3 className="text-2xl font-bold">{heading}</h3>
            <div className="text-lg">
                {text}
            </div>
        </Link>
    );
}