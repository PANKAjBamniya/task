import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";
import { useTasks } from "../hooks/useTasks";
import { filterTasks } from "../utils/filterTasks";
import type { SortOption, Task } from "../types/task";

/* -------------------- TYPES -------------------- */

export type Filter = "all" | "active" | "completed";

export type EditState = {
    isEdit: boolean;
    task: Task | null;
};

export interface TaskContextType {
    tasks: Task[];
    filteredTasks: Task[];

    set: React.Dispatch<React.SetStateAction<Task[]>>;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;


    filter: Filter;
    setFilter: (value: Filter) => void;

    sortBy: SortOption;
    setSortBy: (value: SortOption) => void;

    // edit flow
    editState: EditState;
    setEditState: React.Dispatch<React.SetStateAction<EditState>>;
    onEditClick: (task: Task) => void;
}

/* -------------------- CONTEXT -------------------- */

const TaskContext = createContext<TaskContextType | undefined>(
    undefined
);

/* -------------------- PROVIDER -------------------- */

export function TaskProvider({ children }: { children: ReactNode }) {
    const { state, set, undo, redo, canUndo, canRedo } = useTasks();

    const [filter, setFilter] = useState<Filter>("all");
    const [sortBy, setSortBy] = useState<SortOption>("date");

    const [editState, setEditState] = useState<EditState>({
        isEdit: false,
        task: null,
    });

    const filteredTasks = filterTasks(state, filter, sortBy);

    const onEditClick = (task: Task) => {
        setEditState({
            isEdit: true,
            task: { ...task },
        });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state,
                filteredTasks,

                set,
                undo,
                redo,
                canUndo,
                canRedo,

                filter,
                setFilter,

                sortBy,
                setSortBy,

                editState,
                setEditState,
                onEditClick,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

/* --- HOOK ---- */

export function useTasksContext(): TaskContextType {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error(
            "useTasksContext must be used within a TaskProvider"
        );
    }

    return context;
}
