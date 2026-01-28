import { CodeEditor } from "@/components/editor/CodeEditor";
import { getContactContent } from "@/lib/content";

export default function ContactPage() {
    return (
        <CodeEditor code={getContactContent()} language="markdown" />
    );
}
