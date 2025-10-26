import Link from "next/link";
import { Progman44, Shdocvw257 } from "@react95/icons";

const linkStyles = "inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-100";

const ResponsiveIndexLink = () => {
    return (
        <div className="mb-8">
            <Link href="/responsive" className={linkStyles}>
                <Progman44 variant="32x32_4" />
                Back to home
            </Link>
        </div>
    );
};

export default ResponsiveIndexLink;
