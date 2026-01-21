import { CodeEditor } from "@/components/editor/CodeEditor";
import { getIntroContent } from "@/lib/constants";

export default function HomePage() {
  return (
    <CodeEditor code={getIntroContent()} language="python" />
  );
}
