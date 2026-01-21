import { CodeEditor } from "@/components/editor/CodeEditor";
import { getReadmeContent } from "@/lib/content";

export default function HomePage() {
  return (
    <CodeEditor code={getReadmeContent()} language="markdown" />
  );
}
