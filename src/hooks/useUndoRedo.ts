import { useState } from "react";

export function useUndoRedo<T>(initial: T) {
    const [past, setPast] = useState<T[]>([]);
    const [present, setPresent] = useState<T>(initial);
    const [future, setFuture] = useState<T[]>([]);

    const set = (value: T) => {
        setPast([...past, present]);
        setPresent(value);
        setFuture([]);
    };

    const undo = () => {
        if (!past.length) return;
        const prev = past[past.length - 1];
        setPast(past.slice(0, -1));
        setFuture([present, ...future]);
        setPresent(prev);
    };

    const redo = () => {
        if (!future.length) return;
        const next = future[0];
        setFuture(future.slice(1));
        setPast([...past, present]);
        setPresent(next);
    };

    return { state: present, set, undo, redo };
}
