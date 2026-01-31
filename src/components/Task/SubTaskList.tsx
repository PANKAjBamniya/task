import { useState } from "react";
import { useTasksContext } from "../../context/TaskContext";
import type { Subtask } from "../../types/task";

interface SubTaskListProps {
    subtasks: Subtask[];
}

export default function SubTaskList({ subtasks }: SubTaskListProps) {
    if (subtasks.length === 0) return null;

    return (
        <div className="space-y-2">
            {subtasks.map((subtask, index) => (
                <SubTaskItem
                    key={subtask.id}
                    subtask={subtask}
                    index={index}
                />
            ))}
        </div>
    );
}

function SubTaskItem({ subtask, index }: { subtask: Subtask; index: number }) {
    const { tasks, set } = useTasksContext();
    const [isHovered, setIsHovered] = useState(false);

    const toggleSubtask = () => {
        set(tasks.map(task => ({
            ...task,
            subtasks: task.subtasks.map(st =>
                st.id === subtask.id ? { ...st, completed: !st.completed } : st
            )
        })));
    };

    const deleteSubtask = () => {
        set(tasks.map(task => ({
            ...task,
            subtasks: task.subtasks.filter(st => st.id !== subtask.id)
        })));
    };

    return (
        <div
            className="group/subtask relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                animation: `slideInSubtask 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s backwards`
            }}
        >
            {/* Subtle hover effect */}
            <div className="absolute -inset-x-2 -inset-y-1 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover/subtask:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200">
                {/* Connecting line */}
                <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-gray-600/50 to-transparent" />

                {/* Custom checkbox */}
                <button
                    onClick={toggleSubtask}
                    className="relative flex-shrink-0 group/check z-10"
                >
                    <div className={`
                        w-5 h-5 rounded-md border-2 transition-all duration-300
                        ${subtask.completed
                            ? 'bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400'
                            : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
                        }
                    `}>
                        {subtask.completed && (
                            <svg
                                className="w-full h-full p-0.5 text-white"
                                style={{
                                    animation: 'checkPop 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                                }}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                    </div>
                </button>

                {/* Subtask text */}
                <p className={`
                    flex-1 text-sm transition-all duration-300
                    ${subtask.completed
                        ? 'text-gray-500 line-through opacity-60'
                        : 'text-gray-300'
                    }
                `}>
                    {subtask.title}
                </p>

                {/* Delete button */}
                <button
                    onClick={deleteSubtask}
                    className={`
                        flex-shrink-0 p-1.5 rounded-md transition-all duration-300
                        ${isHovered
                            ? 'opacity-100 translate-x-0 bg-red-500/10 hover:bg-red-500/20'
                            : 'opacity-0 translate-x-2 pointer-events-none'
                        }
                    `}
                >
                    <svg
                        className="w-4 h-4 text-red-400 hover:text-red-300 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <style>{`
                @keyframes slideInSubtask {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes checkPop {
                    0% {
                        transform: scale(0) rotate(-90deg);
                    }
                    50% {
                        transform: scale(1.3) rotate(0deg);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                    }
                }
            `}</style>
        </div>
    );
}