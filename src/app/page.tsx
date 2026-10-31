import { Background } from "@/components/Background";
import { Plot } from "@/components/Plot";
import { contact } from "@/lib/profile";

export default function HomePage() {
    return (
        <main>
            <section className="relative flex h-svh min-h-[560px] flex-col items-center justify-center overflow-hidden px-6 text-center">
                <Background />
                <div className="relative flex flex-col items-center gap-3.5">
                    <h1 className="font-display text-[clamp(52px,10vw,128px)] leading-none font-extralight tracking-[-0.05em] text-balance text-white">
                        Hi there, I&apos;m ZK
                    </h1>
                    <p className="text-white">I build things, then test whether I was right.</p>
                    <p className="text-xs text-white">
                        {contact.name}, Computer Science at SMU, graduating May 2028. Open to 2027 software engineering internships in Singapore.
                    </p>
                </div>
                <a href="#plot" className="absolute bottom-7 inline-flex min-h-11 items-center text-white hover:text-accent">Explore ↓</a>
            </section>

            <div className="flex flex-col lg:h-svh lg:min-h-[640px]">
                <Plot />

                <footer className="mx-auto w-full max-w-[1240px] px-5 pb-10 lg:pb-3">
                    <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line pt-4 lg:pt-1">
                        <span className="inline-flex min-h-11 items-center">{contact.name}</span>
                        <span className="flex flex-wrap gap-x-6">
                            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center">{contact.email}</a>
                            <a href={contact.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center">GitHub ↗</a>
                            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center">LinkedIn ↗</a>
                        </span>
                    </div>
                </footer>
            </div>
        </main>
    );
}
