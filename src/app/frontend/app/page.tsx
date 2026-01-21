import { CodeEditor } from "@/components/editor/CodeEditor";

const APP_TSX = `import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Home';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">~/portfolio</div>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : ''}>
            Projects
          </NavLink>
          <NavLink to="/skills" className={({ isActive }) => isActive ? 'active' : ''}>
            Skills
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>
            Contact
          </NavLink>
        </div>
      </nav>
      
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <footer className="footer">
        <span>Built with React + TypeScript</span>
        <span className="blink">_</span>
      </footer>
    </div>
  );
}`;

export default function FrontendAppPage() {
    return <CodeEditor code={APP_TSX} language="tsx" />;
}
