import { createContext, useContext, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { filterTasks } from "../utils/filterTasks";
import type { SortOption, Task } from "../types/task";

export type EditState = {
    isEdit: boolean;
    task: Task | null;
};

export type TaskContextType = {
    tasks: Task[];
    filteredTasks: Task[];

    set: React.Dispatch<React.SetStateAction<Task[]>>;
    undo: () => void;
    redo: () => void;

    setFilter: (value: string) => void;
    setSort: (value: string) => void;

    sortBy: SortOption;
    setSortBy: (value: SortOption) => void;

    // edit flow
    editState: EditState;
    setEditState: React.Dispatch<React.SetStateAction<EditState>>;
    onEditClick: (task: Task) => void;
};

const TaskContext = createContext<TaskContextType | null>(null);


export function TaskProvider({ children }: { children: React.ReactNode }) {
    const { state, set, undo, redo } = useTasks();
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
    // const [sortBy, setSortBy] = useState<SortOption>("date");
    const [editState, setEditState] = useState<{
        isEdit: boolean;
        task: Task | null;
    }>({
        isEdit: false,
        task: null
    });


    const filteredTasks = filterTasks(state, filter, sort);


    const onEditClick = (task: Task) => {
        // console.log(editState)
        setEditState({
            isEdit: true,
            task: { ...task }
        });
    };


    return (
        <TaskContext.Provider
            value={{
                tasks: state, set, undo, redo, setFilter, setSort, filteredTasks, onEditClick,
                editState, setEditState
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTasksContext = () => useContext(TaskContext);
