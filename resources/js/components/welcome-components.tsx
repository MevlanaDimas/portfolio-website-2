import { About, Project } from '@/types';
import { memo } from 'react';
import { ArrowDown, Github, Globe, Linkedin } from 'lucide-react';
import { GlitchTitle, TextReveal, TagList } from '@/components/typography';
import { TimelineHeader, TimelineItem, ProjectVisual } from '@/components/timeline';
import { WELCOME_BACKGROUND_IMAGES } from '@/lib/welcome-images';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Magnetic } from '@/components/effects';

export const AboutVisual = memo(({ photoUrl, photoName }: { photoUrl?: string, photoName?: string }) => (
    <div className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-800/50 w-full max-w-md mx-auto border border-white/10 shadow-2xl transition-all duration-500 hover:border-[#f53003]/50 hover:shadow-[0_0_30px_rgba(245,48,3,0.15)]">
        {photoUrl && (
            <img 
                src={photoUrl} 
                alt={photoName || "About"}
                decoding="async"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
            />
        )}
    </div>
));

export const ProjectContent = memo(({ project }: { project: Project }) => (
    <div>
        <h3 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter hover:text-[#f53003] transition-colors">{project.title}</h3>
        <TextReveal text={project.description} className="text-gray-300 mb-8 text-lg md:text-xl font-light leading-relaxed" />
        <div className='flex flex-wrap gap-4 mb-8'>
            {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className='group/btn flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-[#f53003] hover:border-[#f53003] transition-all duration-300'>
                    <Globe size={14} className="group-hover/btn:text-white transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover/btn:text-white">Visit Site</span>
                </a>
            )}
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className='group/btn flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300'>
                    <Github size={14} className="group-hover/btn:text-black transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover/btn:text-black">Source Code</span>
                </a>
            )}
        </div>
        <TagList tags={project.tags} />
    </div>
));

export const AboutSection = memo(({ items, onVisible }: { items: About[], onVisible: (index: number) => void }) => (
    <div className="py-20">
        <TimelineHeader title="About Me" />
        {items.map((item, index) => (
            <TimelineItem 
                key={item.id}
                index={index + 1}
                date="BIO"
                side={index % 2 === 0 ? 'left' : 'right'}
                onVisible={onVisible}
                content={
                    <TextReveal text={item.bio} className="text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-6" />
                }
                visual={<AboutVisual photoUrl={item.photo_url} photoName={item.photo_name} />}
            />
        ))}
    </div>
));

export const ProjectSection = memo(({ items, startIndex, onVisible }: { items: Project[], startIndex: number, onVisible: (index: number) => void }) => (
    <div className="pt-20">
        <TimelineHeader title="Selected Work" />
        {items.map((project, index) => (
            <TimelineItem 
                key={index}
                index={startIndex + index + 1}
                date={project.created_at}
                side={index % 2 === 0 ? 'left' : 'right'}
                onVisible={onVisible}
                content={<ProjectContent project={project} />}
                visual={<ProjectVisual project={project} />}
            />
        ))}
        {items.length === 0 && (
            <div className="text-center py-20 text-gray-400 border border-gray-800 rounded-lg backdrop-blur-sm bg-black/30 mx-4 md:mx-auto max-w-2xl relative z-10">
                <p>Projects coming soon.</p>
            </div>
        )}
    </div>
));

export const ScrollProgress = memo(() => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div 
            className="fixed top-0 left-0 right-0 h-1 bg-[#f53003] z-[100] origin-left"
            style={{ scaleX: scrollYProgress }}
        />
    );
});

export const BackgroundLayer = memo(({ index }: { index: number }) => {
    const activeIndex = index % WELCOME_BACKGROUND_IMAGES.length;

    return (
        <div className="fixed top-0 left-0 w-full h-screen z-0 bg-black pointer-events-none">
            {WELCOME_BACKGROUND_IMAGES.map((src, i) => {
                const isActive = i === activeIndex;
                return (
                    <div
                        key={i}
                        className={`absolute inset-0 ${isActive ? 'z-10' : 'z-0'}`}
                        style={{
                            opacity: isActive ? 1 : 0,
                            visibility: isActive ? 'visible' : 'hidden',
                            transition: `opacity 1000ms ease-in-out, visibility 0ms linear ${isActive ? '0ms' : '1000ms'}`
                        }}
                    >
                        <img 
                            src={src} 
                            alt="" 
                            decoding="async"
                            className="w-full h-full object-cover"
                        />
                    </div>
                );
            })}
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none" />
        </div>
    );
});

export const HeroSection = memo(({ onVisible }: { onVisible: () => void }) => {
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 400]);
    const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

    return (
        <section className="min-h-screen flex flex-col justify-center items-center relative z-20">
            <motion.div 
                style={{ y: heroY, opacity: heroOpacity }}
                onViewportEnter={onVisible} 
                className="flex flex-col gap-10 text-center px-4 max-w-5xl mx-auto"
            >
                <GlitchTitle text="Dimas Maulana" />
                <div className="max-w-2xl mx-auto">
                    <TextReveal 
                        text="Full-Stack Developer building modern, responsive, and user-friendly web applications." 
                        className="text-xl md:text-2xl font-light tracking-wide justify-center opacity-90"
                    />
                </div>
            </motion.div>
            <motion.div 
                initial={{ y: 0 }}
                animate={{ y: 10 }}
                transition={{
                    y: { duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono uppercase tracking-widest opacity-70">Scroll</span>
                <ArrowDown size={20} />
            </motion.div>
        </section>
    );
});

export const FooterSection = memo(({ onVisible }: { onVisible: () => void }) => (
    <div className="relative z-10 pb-40 pt-40">
        <motion.div 
            onViewportEnter={onVisible}
            className="max-w-4xl mx-auto text-center px-6"
        >
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-bold tracking-tighter mb-12 uppercase"
            >
                Let's work together.
            </motion.h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Magnetic>
                    <a 
                        href="mailto:maulana.arby10@gmail.com"
                        className="inline-block bg-[#f53003] text-white px-14 py-8 rounded-full font-bold text-2xl uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_50px_rgba(245,48,3,0.6)]"
                    >
                        Get in touch
                    </a>
                </Magnetic>
            </motion.div>
            
            <div className="mt-32 pt-12 border-t border-white/10 flex justify-center gap-8">
                <a href="https://github.com/MevlanaDimas" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f53003] transition-colors" aria-label="GitHub">
                    <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/maulana-arbi/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#f53003] transition-colors" aria-label="LinkedIn">
                    <Linkedin size={24} />
                </a>
            </div>
            <div className="mt-10 text-[10px] uppercase tracking-widest text-gray-600">
                &copy; {new Date().getFullYear()} Dimas Portfolio. All rights reserved.
            </div>
        </motion.div>
    </div>
));
