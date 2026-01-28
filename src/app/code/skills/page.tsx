import { CodeEditor } from "@/components/editor/CodeEditor";
import { getSkillsContent } from "@/lib/content";

export default function SkillsPage() {
    return (
        <CodeEditor code={getSkillsContent()} language="typescript" />
    );
}
