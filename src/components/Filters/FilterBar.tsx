import { useState } from "react";
import { useTasksContext } from "../../context/TaskContext";

type Filter = "all" | "active" | "completed";

export default function FilterBar() {
    const { filter, setFilter } = useTasksContext();
    const [isOpen, setIsOpen] = useState(false);

    const filters: { value: Filter; label: string; icon: string }[] = [
        { value: "all", label: "All Tasks", icon: "M4 6h16M4 12h16M4 18h16" },
        { value: "active", label: "Active", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
        { value: "completed", label: "Completed", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
    ];

    const currentFilter = filters.find(f => f.value === filter) || filters[0];

    return (
        <div className="relative">
            {/* Dropdown button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 hover:border-gray-500/50 rounded-xl text-white text-sm font-medium transition-all duration-300 group"
            >
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentFilter.icon} />
                    </svg>
                    <span>{currentFilter.label}</span>
                </div>
                <svg
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Menu */}
                    <div
                        className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden z-20"
                        style={{ animation: 'dropdownSlide 0.2s ease-out' }}
                    >
                        {filters.map((f, index) => (
                            <button
                                key={f.value}
                                onClick={() => {
                                    setFilter(f.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${filter === f.value
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'text-gray-300 hover:bg-gray-700/50'
                                    }`}
                                style={{
                                    animation: `fadeInItem 0.2s ease-out ${index * 0.05}s backwards`
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={f.icon} />
                                </svg>
                                <span className="text-sm font-medium">{f.label}</span>
                                {filter === f.value && (
                                    <svg className="w-4 h-4 ml-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}

            <style>{`
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInItem {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
        </div>
    );
}