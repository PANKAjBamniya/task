export const isOverdue = (date?: string) =>
    date ? new Date(date) < new Date() : false;
