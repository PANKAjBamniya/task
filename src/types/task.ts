export type Priority = "low" | "medium" | "high";

export type SortOption = "default" | "alphabetical" | "date";


export interface SubTask {
    id: string;
    title: string;
    completed: boolean;
}

export interface Task {
    id: string;
    title: string;
    category: string;
    completed: boolean;
    priority: Priority;
    dueDate?: string;
    tags: string[];
    subtasks: SubTask[];
    createdAt: string;
}
