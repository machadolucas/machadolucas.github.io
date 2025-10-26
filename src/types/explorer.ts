export type ExplorerFile = {
    slug: string;
    title: string;
    summary: string;
    date: string | null;
    tags: string[];
    fileName: string;
    contentHtml: string;
    sourceFile: string;
};
