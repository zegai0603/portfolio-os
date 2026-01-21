import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const HOME_TSX = `import { useEffect, useState } from 'react';

interface Developer {
  name: string;
  title: string;
  bio: string;
  location: string;
  languages: string[];
  hobbies: string[];
}

export default function Home() {
  const [data, setData] = useState<Developer | null>(null);

  useEffect(() => {
    // Fetch from parent app's API
    fetch('/api/intro')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="loading">Loading...</div>;

  return (
    <div className="page home">
      <div className="terminal-header">
        <span className="prompt">$</span> cat intro.py
      </div>
      
      <div className="content">
        <h1 className="glitch" data-text={data.name}>{data.name}</h1>
        <p className="title">{data.title}</p>
        <p className="bio">{data.bio}</p>
        
        <div className="section">
          <h2>// Languages</h2>
          <div className="tags">
            {data.languages.map(lang => (
              <span key={lang} className="tag">{lang}</span>
            ))}
          </div>
        </div>
        
        <div className="section">
          <h2>// Hobbies</h2>
          <ul className="list">
            {data.hobbies.map(hobby => (
              <li key={hobby}>→ {hobby}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}`;

export default function FrontendHomePage() {
    return <CodeEditor code={HOME_TSX} language="tsx" />;
}
