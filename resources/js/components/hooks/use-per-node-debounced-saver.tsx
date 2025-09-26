import { useCallback, useRef } from 'react';

export function usePerNodeDebouncedSaver<K extends string | number, P>(delay: number, onFire: (key: K, mergedPatch: P) => void){
    const timeoutRef = useRef<Map<K, number>>(new Map());
    const pendingRef = useRef<Map<K, P>>(new Map());

    const schedule = useCallback((key: K, patch: P) => {
        const previousPatch = pendingRef.current.get(key) ?? ({} as P);
        const mergedPatch = {
            ...(previousPatch),
            ...patch
        } as P;
        pendingRef.current.set(key, mergedPatch);

        const previousTimer = timeoutRef.current.get(key);
        if (previousTimer) {
            clearTimeout(previousTimer);
        }

        const timer = window.setTimeout(() => {
            console.log("here here")
            const finalPatch = pendingRef.current.get(key);

            pendingRef.current.delete(key);
            timeoutRef.current.delete(key);

            if(finalPatch !== undefined){
                onFire(key, finalPatch);
            }
        }, delay);

        timeoutRef.current.set(key, timer);
    }, [delay, onFire]);

    const flushAll = useCallback(() => {
        for(const [key, timer] of timeoutRef.current){
            clearTimeout(timer);
            const finalPatch = pendingRef.current.get(key);

            pendingRef.current.delete(key);
            timeoutRef.current.delete(key);
            
            if(finalPatch !== undefined){
                onFire(key, finalPatch);
            }
        }
    }, [onFire]);

    return {schedule, flushAll};
}