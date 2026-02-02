import { useState } from "react";

export function useUndoRedo<T>(initial: T) {
    const [past, setPast] = useState<T[]>([]);
    const [present, setPresent] = useState<T>(initial);
    const [future, setFuture] = useState<T[]>([]);

    const set = (value: React.SetStateAction<T>) => {
        const newValue =
            typeof value === "function"
                ? (value as (prev: T) => T)(present)
                : value;

        if (Object.is(newValue, present)) return;

        setPast(prev => [...prev, present]);
        setPresent(newValue);
        setFuture([]);
    };

    const undo = () => {
        if (!past.length) return;

        const prev = past[past.length - 1];
        setPast(p => p.slice(0, -1));
        setFuture(f => [present, ...f]);
        setPresent(prev);
    };

    const redo = () => {
        if (!future.length) return;

        const next = future[0];
        setFuture(f => f.slice(1));
        setPast(p => [...p, present]);
        setPresent(next);
    };

    return {
        state: present,
        set,
        undo,
        redo,
        canUndo: past.length > 0,
        canRedo: future.length > 0,
    };
}
