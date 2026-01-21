import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const CONTACT_TSX = `import { Mail, Github, Linkedin, Instagram, MapPin } from 'lucide-react';
import { config } from '@/lib/config';

export default function Contact() {
  const links = [
    { label: 'Email', value: '${config.email}', href: 'mailto:${config.email}', icon: <Mail size={24} /> },
    { label: 'GitHub', value: '${config.githubUsername}', href: '${config.github}', icon: <Github size={24} /> },
    { label: 'LinkedIn', value: 'LinkedIn', href: '${config.linkedin}', icon: <Linkedin size={24} /> },
    { label: 'Instagram', value: '${config.instagramHandle}', href: '${config.instagram}', icon: <Instagram size={24} /> },
  ];

  return (
    <div className="page contact">
      <div className="terminal-header">
        <span className="prompt">$</span> cat contact.md
      </div>
      
      <div className="content">
        <h1>Get in Touch</h1>
        <p className="subtitle">Open to opportunities and collaborations</p>
        
        <div className="links">
          {links.map(link => (
            <a 
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-card"
            >
              <span className="icon">{link.icon}</span>
              <div className="link-info">
                <span className="link-label">{link.label}</span>
                <span className="link-value">{link.value}</span>
              </div>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
        
        <div className="location">
          <span><MapPin size={16} style={{ display: 'inline' }} /> Based in ${config.location}</span>
        </div>

      </div>
    </div>
  );
}`;

export default function FrontendContactPage() {
  return <CodeEditor code={CONTACT_TSX} language="tsx" />;
}
