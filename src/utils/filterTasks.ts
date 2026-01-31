import type { Task } from "../types/task";

export function filterTasks(tasks: Task[], filter: string, sort: string) {
    let data = [...tasks];

    if (filter === "completed") data = data.filter(t => t.completed);
    if (filter === "pending") data = data.filter(t => !t.completed);

    if (sort === "priority") {
        const order = { high: 1, medium: 2, low: 3 };
        data.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    return data;
}
