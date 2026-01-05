import { CustomCursor, Magnetic, Noise, Preloader, SystemStatus } from '@/components/effects';
import { AboutSection, BackgroundLayer, FooterSection, HeroSection, ProjectSection, ScrollProgress } from '@/components/welcome-components';
import { WELCOME_BACKGROUND_IMAGES } from '@/lib/welcome-images';
import { index as aboutIndex } from '@/routes/about';
import { login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const getContentBgIndex = (index: number) => {
    const availableCount = Math.max(1, WELCOME_BACKGROUND_IMAGES.length - 2);
    return 1 + (index % availableCount);
};

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth, data } = usePage<SharedData>().props;
    const portfolio = (data as any) || {};
    
    const [isLoading, setIsLoading] = useState(true);
    const aboutItems = Array.isArray(portfolio.about?.data) ? portfolio.about.data : [];
    const projectItems = Array.isArray(portfolio.projects?.data) ? portfolio.projects.data : [];

    const handleVisible = useCallback((index: number) => {
        setCurrentBgIndex(getContentBgIndex(index));
    }, []);

    const [currentBgIndex, setCurrentBgIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: containerProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const scaleY = useSpring(containerProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Preload images
    const preloadedImages = useRef<HTMLImageElement[]>([]);
    useEffect(() => {
        WELCOME_BACKGROUND_IMAGES.forEach((src) => {
            const img = new Image();
            img.src = src;
            preloadedImages.current.push(img);
        });
    }, []);

    const timelineContent = useMemo(() => (
        <>
            <AboutSection items={aboutItems} onVisible={handleVisible} />
            <ProjectSection items={projectItems} startIndex={aboutItems.length} onVisible={handleVisible} />
        </>
    ), [aboutItems, projectItems, handleVisible]);

    return (
        <>
            <Head>
                <title>Welcome</title>
                <meta
                    name="description"
                    content="Welcome to my portfolio. Discover my projects, learn more about my skills and professional journey."
                />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            
            <ScrollProgress />

            <AnimatePresence mode="wait">
                {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
            </AnimatePresence>

            <BackgroundLayer index={currentBgIndex} />
            
            <Noise />
            
            <div className="relative z-10 min-h-screen text-[#EDEDEC] font-['Instrument_Sans',sans-serif] selection:bg-[#f53003] selection:text-white overflow-x-hidden">
                
                {!isLoading && <CustomCursor />}
                {!isLoading && <SystemStatus />}
                
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:p-10 mix-blend-difference text-white">
                    <Magnetic>
                        <Link href="/" className="block text-xl font-bold tracking-tighter uppercase transition duration-500 hover:rotate-x-360">
                            <img 
                                src="/output-onlinepngtools.svg" 
                                alt="Logo" 
                                className="h-15 w-auto" 
                            />
                        </Link>
                    </Magnetic>
                    <div className="flex gap-6 text-sm font-medium">
                        {auth.user ? (
                            <Magnetic>
                                <Link href={aboutIndex()} className="text-sm font-bold uppercase tracking-widest hover:text-[#f53003] transition-colors">
                                    Dashboard
                                </Link>
                            </Magnetic>
                        ) : (
                            <>
                                <Magnetic>
                                    <Link href={login()} className="text-sm font-bold uppercase tracking-widest hover:text-[#f53003] transition-colors">
                                        Log in
                                    </Link>
                                </Magnetic>
                                {canRegister && (
                                    <Magnetic>
                                        <Link href={register()} className="text-sm font-bold uppercase tracking-widest hover:text-[#f53003] transition-colors">
                                            Register
                                        </Link>
                                    </Magnetic>
                                )}
                            </>
                        )}
                    </div>
                </nav>

                <main className="flex flex-col relative">
                    
                    {/* Hero Section */}
                    <HeroSection onVisible={() => setCurrentBgIndex(0)} />

                    {/* Timeline Container */}
                    <div className="relative w-full max-w-7xl mx-auto px-4 mb-20" ref={containerRef}>
                        {/* Central Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
                        <motion.div 
                            style={{ scaleY }} 
                            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#f53003] md:-translate-x-1/2 origin-top" 
                        />

                        {timelineContent}
                    </div>

                    {/* Footer / Contact */}
                    <FooterSection onVisible={() => setCurrentBgIndex(WELCOME_BACKGROUND_IMAGES.length - 1)} />
                </main>
            </div>
        </>
    );
}
