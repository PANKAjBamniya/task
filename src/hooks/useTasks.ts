import { useUndoRedo } from "./useUndoRedo";
import { usePersistentState } from "./usePersistentState";
import type { Task } from "../types/task";

export function useTasks() {
    const undoRedo = useUndoRedo<Task[]>([]);
    usePersistentState(undoRedo.state, undoRedo.set);
    return undoRedo;
}
