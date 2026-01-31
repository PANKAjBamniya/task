import { createContext, useContext, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { filterTasks } from "../utils/filterTasks";
import type { Task } from "../types/task";

const TaskContext = createContext<any>(null);


export function TaskProvider({ children }: { children: React.ReactNode }) {
    const { state, set, undo, redo } = useTasks();
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("date");
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
            value={{ tasks: state, set, undo, redo, setFilter, setSort, filteredTasks, onEditClick, editState, setEditState }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export const useTasksContext = () => useContext(TaskContext);
