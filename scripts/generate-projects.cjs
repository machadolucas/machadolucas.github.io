#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT_DIR, "src", "generated");

const COLLECTIONS = [
    {
        name: "Projects",
        manifestKey: "projects",
        contentDir: path.join(ROOT_DIR, "content", "projects"),
        outputFile: path.join(OUTPUT_DIR, "projects.json"),
    },
    {
        name: "Home Automation",
        manifestKey: "homeAutomation",
        contentDir: path.join(ROOT_DIR, "content", "home-automation"),
        outputFile: path.join(OUTPUT_DIR, "homeAutomation.json"),
    },
];

function ensureDirectories() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    COLLECTIONS.forEach((collection) => {
        if (!fs.existsSync(collection.contentDir)) {
            fs.mkdirSync(collection.contentDir, { recursive: true });
        }
    });
}

function loadEntries(contentDir, manifestKey) {
    const entries = fs
        .readdirSync(contentDir, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => entry.name)
        .sort();

    return entries.map((fileName) => {
        const filePath = path.join(contentDir, fileName);
        const rawContent = fs.readFileSync(filePath, "utf8");
        const { data: frontmatter, content } = matter(rawContent);

        if (!frontmatter.title) {
            throw new Error(
                `${manifestKey} markdown file "${fileName}" is missing a required frontmatter field: title`
            );
        }

        const slug = (frontmatter.slug || fileName.replace(/\.md$/i, "")).trim();
        const safeSlug = slug.replace(/[^a-z0-9-_]/gi, "-").toLowerCase();

        const html = marked.parse(content, { async: false });

        return {
            slug: safeSlug,
            title: String(frontmatter.title),
            summary: frontmatter.summary ? String(frontmatter.summary) : "",
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
            tags: Array.isArray(frontmatter.tags)
                ? frontmatter.tags.map((tag) => String(tag))
                : [],
            fileName: frontmatter.fileName
                ? String(frontmatter.fileName)
                : `${frontmatter.title}.md`,
            contentHtml: html,
            sourceFile: fileName,
        };
    });
}

function writeManifest(manifestKey, items, outputFile, collectionName) {
    const manifest = {
        generatedAt: new Date().toISOString(),
        count: items.length,
        [manifestKey]: items,
    };

    fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2), "utf8");
    console.log(`Generated ${collectionName} manifest with ${items.length} item(s).`);
}

function main() {
    ensureDirectories();
    COLLECTIONS.forEach((collection) => {
        const entries = loadEntries(collection.contentDir, collection.manifestKey);
        writeManifest(collection.manifestKey, entries, collection.outputFile, collection.name);
    });
}

main();
