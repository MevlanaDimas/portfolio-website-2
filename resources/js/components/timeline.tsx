import { Project } from '@/types';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { memo, useCallback, useRef, useState } from 'react';

export const TimelineHeader = memo(function TimelineHeader({ title }: { title: string }) {
    return (
        <div className="flex justify-center items-center mb-20 relative z-10 sticky top-32 pointer-events-none">
            <div className="h-px bg-gradient-to-r from-transparent via-[#f53003]/50 to-transparent w-full max-w-xs absolute top-1/2 -translate-y-1/2" />
            <div className="bg-black/80 backdrop-blur-md border border-[#f53003]/30 text-[#f53003] px-6 py-2 rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(245,48,3,0.2)] relative z-10">
                {title}
            </div>
        </div>
    );
});

const formatDate = (date?: string) => {
    if (!date) return undefined;
    const parts = date ? date.split(' ')[0].split('-') : [];
    if (parts.length === 3) {
        const [day, month, year] = parts;
        return `${month}/${year}`;
    }
    return date;
};

const CornerMarkers = memo(() => (
    <>
        <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/30 -translate-x-px -translate-y-px" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/30 translate-x-px -translate-y-px" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/30 -translate-x-px translate-y-px" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/30 translate-x-px translate-y-px" />
    </>
));

const TimelineIndex = memo(({ index, side }: { index: number, side: 'left' | 'right' }) => (
    <div className={`absolute top-12 ${side === 'left' ? 'left-4 md:left-12' : 'right-4 md:right-12'} text-8xl md:text-[10rem] font-bold text-white/[0.02] leading-none select-none pointer-events-none z-0 font-sans`}>
        {index.toString().padStart(2, '0')}
    </div>
));

export const TimelineItem = memo(function TimelineItem({ content, visual, date, side = 'left', onVisible, index }: { content: React.ReactNode, visual: React.ReactNode, date?: string, side?: 'left' | 'right', onVisible?: (index: number) => void, index?: number }) {
    const yearMonthFormat = formatDate(date);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            onViewportEnter={() => index !== undefined && onVisible?.(index)}
            className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 py-24 border-t border-white/5 items-center"
        >
            <CornerMarkers />

            {index !== undefined && <TimelineIndex index={index} side={side} />}

            <div className="absolute left-4 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-x-1/2 flex flex-col items-center z-10">
                {yearMonthFormat && (
                    <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#f53003] bg-black/80 backdrop-blur-sm px-3 py-1 border border-[#f53003]/30 rounded-full shadow-[0_0_10px_rgba(245,48,3,0.2)]">
                        {yearMonthFormat}
                    </span>
                )}
                <motion.div 
                    initial={{ backgroundColor: "rgba(255, 255, 255, 0.1)", boxShadow: "0 0 0px #f53003" }}
                    whileInView={{ backgroundColor: "#f53003", boxShadow: "0 0 20px #f53003" }}
                    viewport={{ margin: "0px 0px -50% 0px" }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4 rounded-full ring-4 ring-black" 
                />
            </div>
            <div className={`pl-12 md:pl-0 md:pr-24 ${side === 'left' ? 'md:text-right' : 'md:text-right'}`}>
                {side === 'left' ? content : visual}
            </div>
            <div className={`pl-12 md:pl-0 md:pl-24 ${side === 'left' ? 'md:text-left' : 'md:text-left'}`}>
                {side === 'left' ? visual : content}
            </div>
        </motion.div>
    );
});

const sliderVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
    }),
    center: {
        zIndex: 1,
        x: 0,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? "100%" : "-100%",
    })
};

const imageVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? "-100%" : "100%",
        scale: 1.5
    }),
    center: {
        x: 0,
        scale: 1.15
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "-100%" : "100%",
        scale: 1.5
    })
};

const transition = {
    x: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    opacity: { duration: 0.2 }
};

const ScanlineOverlay = memo(() => (
    <>
        <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none z-20"
            style={{ backgroundImage: 'linear-gradient(to bottom, transparent 50%, black 50%)', backgroundSize: '100% 4px' }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
    </>
));

const ProjectNavigation = memo(({ 
    hasMultipleImages, 
    onPrev, 
    onNext, 
    images, 
    currentIndex, 
    onDotClick 
}: { 
    hasMultipleImages: boolean;
    onPrev: (e: React.MouseEvent) => void;
    onNext: (e: React.MouseEvent) => void;
    images: any[];
    currentIndex: number;
    onDotClick: (index: number, e: React.MouseEvent) => void;
}) => {
    if (!hasMultipleImages) return null;

    return (
        <>
            <button onClick={onPrev} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer">
                <ChevronLeft size={16} />
            </button>
            <button onClick={onNext} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer">
                <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                {images.map((_, idx) => (
                    <button key={idx} onClick={(e) => onDotClick(idx, e)} aria-label={`Go to image ${idx + 1}`} className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${idx === currentIndex ? 'bg-[#f53003] w-3' : 'bg-white/50 hover:bg-white/80'} cursor-pointer`} />
                ))}
            </div>
        </>
    );
});

export const ProjectVisual = memo(function ProjectVisual({ project }: { project: Project }) {
    // Handle image source: check for 'images' array first, then 'image' property
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const parallaxY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    const images = project.images || [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const hasMultipleImages = images.length > 1;
    const currentImageUrl = images.length > 0 ? images[currentImageIndex].image_url : null;

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentImageIndex((prev) => (prev + newDirection + images.length) % images.length);
    }, [images.length]);

    const handlePrev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); paginate(-1); }, [paginate]);
    const handleNext = useCallback((e: React.MouseEvent) => { e.stopPropagation(); paginate(1); }, [paginate]);
    const handleDotClick = useCallback((idx: number, e: React.MouseEvent) => { e.stopPropagation(); paginate(idx - currentImageIndex); }, [paginate, currentImageIndex]);


    return (
        <div className="group w-full" ref={containerRef}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-gray-900 shadow-2xl border border-white/10 ring-1 ring-white/5 transition-all duration-500 group-hover:border-[#f53003]/50 group-hover:shadow-[0_0_30px_rgba(245,48,3,0.15)]">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    {currentImageUrl && (
                        <motion.div
                            key={currentImageIndex}
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={transition}
                            className="absolute inset-0 w-full h-full overflow-hidden"
                        >
                            <motion.img 
                                custom={direction}
                                variants={imageVariants}
                                transition={transition}
                                style={{ y: parallaxY }}
                                src={currentImageUrl} 
                                alt={project.title} 
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <ScanlineOverlay />
                
                <ProjectNavigation 
                    hasMultipleImages={hasMultipleImages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    images={images}
                    currentIndex={currentImageIndex}
                    onDotClick={handleDotClick}
                />
            </div>
        </div>
    );
});