import { CodeEditor } from "@/components/editor/CodeEditor";

const MAIN_TSX = `import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);`;

export default function FrontendMainPage() {
    return <CodeEditor code={MAIN_TSX} language="tsx" />;
}
