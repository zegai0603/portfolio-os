import { CodeEditor } from "@/components/editor/CodeEditor";
import { getIntroContent } from "@/lib/content";

export default function IntroPage() {
    return (
        <CodeEditor code={getIntroContent()} language="python" />
    );
}
