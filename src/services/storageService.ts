const KEY = "todo_tasks";

export const loadTasks = () => {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: any[]) => {
    localStorage.setItem(KEY, JSON.stringify(tasks));
};
