import { useEffect, useState } from "react";
import { useTasksContext } from "../../context/TaskContext";

export default function TaskForm() {
    const { tasks, set, editState, setEditState } = useTasksContext();
    const [title, setTitle] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        // Edit
        if (editState.isEdit && editState.task) {
            set(
                tasks.map(t =>
                    t.id === editState.task!.id
                        ? { ...t, title: title.trim() }
                        : t
                )
            );

            setTitle("");
            setEditState({
                isEdit: false,
                task: null
            });

            return;
        }

        // ADD 
        const newTask = {
            id: crypto.randomUUID(),
            title: title.trim(),
            completed: false,
            subtasks: [],
            createdAt: new Date().toISOString()
        };

        set([...tasks, newTask]);
        setTitle("");
    };



    useEffect(() => {
        if (editState.isEdit && editState.task) {
            setTitle(editState.task.title);
        }
    }, [editState]);

    return (
        <form onSubmit={handleSubmit} className="relative">
            {/* Glow effect when focused */}
            {isFocused && (
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg transition-opacity duration-300" />
            )}

            <div className="relative flex gap-3">
                {/* Input field */}
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

                    {/* Character count indicator (optional) */}
                    {title?.length > 0 && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {title.length}
                        </div>
                    )}
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={!title.trim()}
                    className="px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-blue-500/25 flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>

            {/* Quick tips (optional - shows when input is focused and empty) */}
            {isFocused && !title && (
                <div
                    className="mt-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                >
                    <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                            <p className="text-xs text-blue-300 font-medium">Quick Tip</p>
                            <p className="text-xs text-blue-400/80 mt-0.5">
                                Press <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Enter</kbd> to add task quickly
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </form>
    );
}