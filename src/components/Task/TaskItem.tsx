import { useState } from "react";
import { useTasksContext } from "../../context/TaskContext";
import type { Task } from "../../types/task";
import SubTaskList from "./SubTaskList";
import SubTaskModel from "../UI/SubTaskModel";

export default function TaskItem({ task }: { task: Task }) {
    const { tasks, set, onEditClick } = useTasksContext();
    const [subTitle, setSubTitle] = useState("");
    const [showSubTask, setShowSubtask] = useState(false);

    const addSubTask = () => {
        if (!subTitle.trim()) return;

        const updatedTasks = tasks.map((t: Task) =>
            t.id === task.id
                ? {
                    ...t,
                    subtasks: [
                        ...t.subtasks,
                        {
                            id: crypto.randomUUID(),
                            title: subTitle,
                            completed: false
                        }
                    ]
                }
                : t
        );

        set(updatedTasks);
        setSubTitle("");
        setShowSubtask(false);
    };

    const toggle = () =>
        set(tasks.map(t =>
            t.id === task.id ? { ...t, completed: !t.completed } : t
        ));

    const editTask = (task: Task) => {
        // console.log(task)
        onEditClick(task)
    }
    const deleteTask = () =>
        set(tasks.filter(t => t.id !== task.id));

    const completedSubtasks = task.subtasks.filter(st => st.completed).length;
    const totalSubtasks = task.subtasks.length;
    const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

    return (
        <div
            className="group relative mt-4 transition-all duration-500 ease-out"
            style={{
                animation: 'slideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
        >
            {/* Animated gradient background */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[1.125rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

            {/* Main card */}
            <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300">

                {/* Task header */}
                <div className="flex items-start gap-4 mb-3">
                    {/* Custom animated checkbox */}
                    <button
                        onClick={toggle}
                        className="relative flex-shrink-0 mt-1 group/checkbox"
                    >
                        <div className={`
                            w-6 h-6 rounded-lg border-2 transition-all duration-300
                            ${task.completed
                                ? 'bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-400 scale-100'
                                : 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50 scale-100 hover:scale-110'
                            }
                        `}>
                            {task.completed && (
                                <svg
                                    className="w-full h-full p-1 text-white"
                                    style={{
                                        animation: 'checkmark 0.4s cubic-bezier(0.65, 0, 0.35, 1)'
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
                        {task.completed && (
                            <div className="absolute inset-0 rounded-lg bg-emerald-400/30 blur-md -z-10" />
                        )}
                    </button>

                    {/* Task title and progress */}
                    <div className="flex-1 min-w-0 mt-1">
                        <p className={`
                            text-lg font-medium transition-all duration-300 leading-5 wrap-break-word
                            ${task.completed
                                ? 'text-gray-400 line-through opacity-60'
                                : 'text-white'
                            }
                        `}>
                            {task.title}
                        </p>

                        {/* Progress bar for subtasks */}
                        {totalSubtasks > 0 && (
                            <div className="mt-3 space-y-1.5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-400 font-medium">
                                        {completedSubtasks}/{totalSubtasks} subtasks
                                    </span>
                                    <span className="text-gray-500 font-semibold">
                                        {Math.round(progress)}%
                                    </span>
                                </div>
                                <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out relative"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 ml-10 mt-3">
                    <button
                        onClick={() => setShowSubtask(prev => !prev)}
                        className="
                            flex items-center gap-2 px-4 py-2
                            bg-blue-500/10 hover:bg-blue-500/20
                            border border-blue-500/30 hover:border-blue-400/60
                            text-blue-400 hover:text-blue-300
                            rounded-xl text-sm font-medium
                            transition-all duration-200 ease-out
                            hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20
                            active:translate-y-0 active:scale-95
                        "
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Subtask
                    </button>


                    <button
                        onClick={() => editTask(task)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-400/60 text-amber-400 hover:text-amber-300 rounded-xl text-sm font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95"
                    >
                        ✏️ Edit
                    </button>


                    <button
                        onClick={deleteTask}
                        className="
    flex items-center gap-2 px-4 py-2
    bg-red-500/10 hover:bg-red-500/20
    border border-red-500/30 hover:border-red-400/60
    text-red-400 hover:text-red-300
    rounded-xl text-sm font-medium
    transition-all duration-200 ease-out
    hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/20
    active:scale-95
  "
                    >
                        🗑 Delete
                    </button>

                </div>

                {/* Subtask modal */}
                {showSubTask && (
                    <div
                        className="mt-4"
                        style={{
                            animation: 'fadeIn 0.3s ease-out'
                        }}
                    >
                        <SubTaskModel
                            value={subTitle}
                            setValue={setSubTitle}
                            onAdd={addSubTask}
                            onClose={() => setShowSubtask(false)}
                        />
                    </div>
                )}

                {/* Subtasks list */}
                {task.subtasks.length > 0 && (
                    <div className="mt-4 ml-10">
                        <SubTaskList subtasks={task.subtasks} />
                    </div>
                )}
            </div>

            <style>{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes checkmark {
                    0% {
                        transform: scale(0) rotate(-45deg);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.2) rotate(0deg);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                        opacity: 1;
                    }
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }

                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div >
    );
}