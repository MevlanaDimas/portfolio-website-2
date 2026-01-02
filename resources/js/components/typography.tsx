import { motion } from 'framer-motion';

export function GlitchTitle({ text }: { text: string }) {
    return (
        <div className="relative inline-block group cursor-default">
            <motion.h1 
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-9xl lg:text-[11rem] leading-[0.8] font-bold tracking-tighter mb-8 uppercase relative z-10"
            >
                {text}
            </motion.h1>
            <motion.h1 
                className="absolute top-0 left-0 text-6xl md:text-9xl lg:text-[11rem] leading-[0.8] font-bold tracking-tighter mb-8 uppercase text-[#f53003] opacity-0 group-hover:opacity-50 animate-glitch-1 mix-blend-screen pointer-events-none"
            >
                {text}
            </motion.h1>
            <motion.h1 
                className="absolute top-0 left-0 text-6xl md:text-9xl lg:text-[11rem] leading-[0.8] font-bold tracking-tighter mb-8 uppercase text-cyan-400 opacity-0 group-hover:opacity-50 animate-glitch-2 mix-blend-screen pointer-events-none"
            >
                {text}
            </motion.h1>
            <style>{`
                @keyframes glitch-1 {
                    0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
                    20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
                    40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
                    60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
                    80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
                    100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
                }
                @keyframes glitch-2 {
                    0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); }
                    20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); }
                    40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, 1px); }
                    60% { clip-path: inset(10% 0 80% 0); transform: translate(-1px, -2px); }
                    80% { clip-path: inset(50% 0 30% 0); transform: translate(1px, 2px); }
                    100% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, -1px); }
                }
                .animate-glitch-1 { animation: glitch-1 0.4s infinite linear alternate-reverse; }
                .animate-glitch-2 { animation: glitch-2 0.4s infinite linear alternate-reverse; }
            `}</style>
        </div>
    );
}

export function TextReveal({ text, className = "" }: { text: string, className?: string }) {
    const words = text.split(" ");
    return (
        <p className={`flex flex-wrap gap-x-1.5 gap-y-1 ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="overflow-hidden inline-block relative">
                    <motion.span
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.01, ease: [0.33, 1, 0.68, 1] }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </p>
    );
}

export function TagList({ tags }: { tags?: string | null }) {
    if (!tags) return <span className="text-[#f53003]">-</span>;

    const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    return (
        <div className="flex flex-wrap gap-2">
            {tagsArray.map((tag, i) => (
                <a key={i} href={`https://www.google.com/search?q=${tag}`} target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-500 font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10 bg-transparent transition-all duration-300 hover:border-[#f53003] hover:text-white hover:bg-[#f53003]">
                    {tag}
                </a>
            ))}
        </div>
    );
}
