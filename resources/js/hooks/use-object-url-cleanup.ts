import { useEffect, useRef } from 'react';

export function useObjectUrlCleanup(urls: (string | null | undefined)[]) {
    // Keep a reference to the latest URLs to ensure we can clean them up on unmount
    // without triggering the effect every time the array changes (which would break active previews).
    const urlsRef = useRef(urls);
    urlsRef.current = urls;

    useEffect(() => {
        return () => {
            urlsRef.current.forEach((url) => {
                if (url && typeof url === 'string' && url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, []);
}
