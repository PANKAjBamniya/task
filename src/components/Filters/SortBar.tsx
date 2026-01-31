import { useState } from "react";
import { useTasksContext } from "../../context/TaskContext";

type SortOption = "default" | "alphabetical" | "date";

export default function SortBar() {
    const { sortBy, setSortBy } = useTasksContext();
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions: { value: SortOption; label: string; icon: string }[] = [
        { value: "default", label: "Default", icon: "M4 6h16M4 12h16M4 18h16" },
        { value: "alphabetical", label: "A to Z", icon: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" },
        { value: "date", label: "By Date", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    ];

    const currentSort = sortOptions.find(s => s.value === sortBy) || sortOptions[0];

    return (
        <div className="relative">
            {/* Dropdown button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 border border-gray-600/50 hover:border-gray-500/50 rounded-xl text-white text-sm font-medium transition-all duration-300 group"
            >
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={currentSort.icon} />
                    </svg>
                    <span>{currentSort.label}</span>
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
                        {sortOptions.map((option, index) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setSortBy(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200 ${sortBy === option.value
                                    ? 'bg-purple-500/20 text-purple-400'
                                    : 'text-gray-300 hover:bg-gray-700/50'
                                    }`}
                                style={{
                                    animation: `fadeInItem 0.2s ease-out ${index * 0.05}s backwards`
                                }}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={option.icon} />
                                </svg>
                                <span className="text-sm font-medium">{option.label}</span>
                                {sortBy === option.value && (
                                    <svg className="w-4 h-4 ml-auto text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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