import { CodeEditor } from "@/components/editor/CodeEditor";
import { config } from "@/lib/config";

const CONTACTS_TSX = `interface ContactsProps {
    onBack: () => void;
}

const contactLinks = [
    { label: "mail", value: "${config.email}", href: "mailto:${config.email}" },
    { label: "github", value: "${config.githubUsername}", href: "${config.github}" },
    { label: "linkedin", value: "linkedin", href: "${config.linkedin}" },
    { label: "instagram", value: "${config.instagramHandle}", href: "${config.instagram}" },
].filter((c) => c.value && c.href);

export default function Contacts({ onBack }: ContactsProps) {
    return (
        <div className="cli-section">
            <div className="cli-prompt">
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span> cat contacts.md
            </div>

            <div className="cli-contacts">
                <div className="cli-contacts-header">
                    <span>PROTO</span>
                    <span>ADDRESS</span>
                    <span>STATE</span>
                </div>

                {contactLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cli-contact-row"
                    >
                        <span className="cli-contact-proto">{link.label}</span>
                        <span className="cli-contact-addr">{link.value || link.href}</span>
                        <span className="cli-contact-state">ESTABLISHED</span>
                    </a>
                ))}

                <div className="cli-contact-row cli-contact-location">
                    <span className="cli-contact-proto">geo</span>
                    <span className="cli-contact-addr">${config.location}</span>
                    <span className="cli-contact-state">ACTIVE</span>
                </div>
            </div>

            <div className="cli-contact-msg">
                <span className="cli-comment"># feel free to reach out!</span>
            </div>

            <button className="cli-back" onClick={onBack}>
                <span className="cli-tilde">~</span> <span className="cli-dollar">$</span>{" "}
                <span className="cli-back-cmd">cd .. (back)</span>
            </button>
        </div>
    );
}`;

export default function FrontendContactPage() {
  return <CodeEditor code={CONTACTS_TSX} language="tsx" />;
}
