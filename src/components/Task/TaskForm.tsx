import { useEffect, useState } from "react";
import { useTasksContext } from "../../context/TaskContext";
import type { Task } from "../../types/task";

export default function TaskForm() {
    const { set, editState, setEditState } = useTasksContext();

    const [title, setTitle] = useState<string>("");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title.trim()) return;

        if (editState.isEdit && editState.task) {
            set((prev) =>
                prev.map((t) =>
                    t.id === editState.task?.id
                        ? { ...t, title: title.trim() }
                        : t
                )
            );

            setTitle("");
            setEditState({ isEdit: false, task: null });
            return;
        }

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            priority: "medium",
            tags: [],
            subtasks: [],
            createdAt: new Date().toISOString(),
        };

        set((prev) => [...prev, newTask]);
        setTitle("");
    };

    useEffect(() => {
        if (editState.isEdit && editState.task) {
            setTitle(editState.task.title);
        }
    }, [editState]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            {isFocused && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg transition-opacity duration-300" />
            )}

            <div className="relative flex gap-3">
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="What needs to be done?"
                        className="w-full px-5 py-4 bg-gray-900/50 border border-gray-600/50 focus:border-blue-500/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />

                    {title.length > 0 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {title.length}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center gap-2"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Save</span>
                </button>
            </div>
        </form>
    );
}
