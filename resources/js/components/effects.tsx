import { motion } from 'framer-motion';
import { memo, useEffect, useRef, useState } from 'react';

const noiseOverlay = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E";

export function Preloader({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    const onCompleteRef = useRef(onComplete);
    onCompleteRef.current = onComplete;

    useEffect(() => {
        const duration = 1500;
        const start = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * 100));

            if (progress < 1) {
                raf = requestAnimationFrame(tick);
            } else {
                setTimeout(() => {
                    onCompleteRef.current();
                }, 800);
            }
        };

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-[100] bg-black flex items-end justify-end p-10 md:p-20"
        >
            <div className="text-[15vw] leading-none font-bold text-[#f53003] font-sans tracking-tighter">
                {count}%
            </div>
        </motion.div>
    );
}

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(pointer: fine)');
        setIsEnabled(mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsEnabled(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        let rafId: number;
        const updateMousePosition = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
                const target = e.target as HTMLElement;
                const isClickable = target.closest('a') || target.closest('button') || target.closest('.cursor-pointer');
                setIsHovering(!!isClickable);
            });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            cancelAnimationFrame(rafId);
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-[#f53003] rounded-full pointer-events-none z-[100] mix-blend-difference"
            animate={{ 
                x: mousePosition.x - 8, 
                y: mousePosition.y - 8,
                scale: isHovering ? 3 : 1
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        />
    );
}

export const Noise = memo(function Noise() {
    return (
        <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
            <div 
                className="absolute inset-[-200%] w-[400%] h-[400%] opacity-[0.08] mix-blend-overlay"
                style={{ 
                    backgroundImage: `url("${noiseOverlay}")`,
                    animation: 'noise 0.2s infinite'
                }} 
            />
            <style>{`
                @keyframes noise {
                    0% { transform: translate(0,0); }
                    10% { transform: translate(-5%,-5%); }
                    20% { transform: translate(-10%,5%); }
                    30% { transform: translate(5%,-10%); }
                    40% { transform: translate(-5%,15%); }
                    50% { transform: translate(-10%,5%); }
                    60% { transform: translate(15%,0); }
                    70% { transform: translate(0,10%); }
                    80% { transform: translate(-15%,0); }
                    90% { transform: translate(10%,5%); }
                    100% { transform: translate(5%,0); }
                }
            `}</style>
        </div>
    );
});

export function SystemStatus() {
    const [time, setTime] = useState<string>("");
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)');
        setIsEnabled(mq.matches);

        const handler = (e: MediaQueryListEvent) => setIsEnabled(e.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        if (!isEnabled) return;

        let rafId: number;
        const updateTime = () => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            const s = now.getSeconds().toString().padStart(2, '0');
            const ms = now.getMilliseconds().toString().padStart(3, '0');
            setTime(`${h}:${m}:${s}:${ms}`);
            rafId = requestAnimationFrame(updateTime);
        };
        updateTime();
        return () => cancelAnimationFrame(rafId);
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-1 text-[10px] font-mono text-[#f53003] mix-blend-difference tracking-widest opacity-70 pointer-events-none">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-[#f53003] rounded-full animate-pulse" />
                <span>SYSTEM.ONLINE</span>
            </div>
            <div>COORDS: 34.0522° N, 118.2437° W</div>
            <div>SYNC: {time}</div>
        </div>
    );
}

export function Magnetic({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const rectRef = useRef<DOMRect | null>(null);

    const handleMouseEnter = () => {
        if (ref.current) {
            rectRef.current = ref.current.getBoundingClientRect();
        }
    };

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = rectRef.current || ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative", x, y }}
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}
