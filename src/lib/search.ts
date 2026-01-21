import { getAllSearchableContent } from "./content";

export interface SearchResult {
    file: string;
    line: number;
    content: string;
    matchIndex: number;
}

export interface FileResult {
    file: string;
    matches: SearchResult[];
}

export function searchFiles(query: string): FileResult[] {
    if (!query || query.trim().length < 2) return [];

    const lowerQuery = query.toLowerCase();
    const allContent = getAllSearchableContent();
    const results: FileResult[] = [];

    Object.entries(allContent).forEach(([filePath, content]) => {
        const lines = content.split('\n');
        const fileMatches: SearchResult[] = [];

        lines.forEach((line, index) => {
            const lowerLine = line.toLowerCase();
            const matchIndex = lowerLine.indexOf(lowerQuery);

            if (matchIndex !== -1) {
                fileMatches.push({
                    file: filePath,
                    line: index + 1,
                    content: line.trim(), // Trim for display
                    matchIndex
                });
            }
        });

        if (fileMatches.length > 0) {
            results.push({
                file: filePath,
                matches: fileMatches
            });
        }
    });

    return results;
}
