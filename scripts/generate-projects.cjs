#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");

const ROOT_DIR = path.resolve(__dirname, "..");
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects");
const OUTPUT_DIR = path.join(ROOT_DIR, "src", "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "projects.json");

function ensureDirectories() {
    if (!fs.existsSync(PROJECTS_DIR)) {
        fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    }
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
}

function loadProjectFiles() {
    const entries = fs
        .readdirSync(PROJECTS_DIR, { withFileTypes: true })
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .map((entry) => entry.name)
        .sort();

    return entries.map((fileName) => {
        const filePath = path.join(PROJECTS_DIR, fileName);
        const rawContent = fs.readFileSync(filePath, "utf8");
        const { data: frontmatter, content } = matter(rawContent);

        if (!frontmatter.title) {
            throw new Error(
                `Project markdown file "${fileName}" is missing a required frontmatter field: title`
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

function writeManifest(projects) {
    const manifest = {
        generatedAt: new Date().toISOString(),
        count: projects.length,
        projects,
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), "utf8");
}

function main() {
    ensureDirectories();
    const projects = loadProjectFiles();
    writeManifest(projects);
}

main();
