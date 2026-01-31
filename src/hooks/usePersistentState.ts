import { useEffect } from "react";
import { saveTasks, loadTasks } from "../services/storageService";

export function usePersistentState<T>(
    value: T,
    setValue: (v: T) => void
) {
    useEffect(() => {
        setValue(loadTasks());
    }, []);

    useEffect(() => {
        saveTasks(value as any);
    }, [value]);
}
