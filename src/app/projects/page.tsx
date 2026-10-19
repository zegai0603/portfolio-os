import { CodeEditor } from "@/components/editor/CodeEditor";
import { getProjectsContent } from "@/lib/content";

export default function ProjectsPage() {
    return <CodeEditor code={getProjectsContent()} language="json" />;
}
