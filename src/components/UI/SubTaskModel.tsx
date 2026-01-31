import { useEffect, useRef } from "react";

interface SubTaskModelProps {
    value: string;
    setValue: (value: string) => void;
    onAdd: () => void;
    onClose: () => void;
}

export default function SubTaskModel({ value, setValue, onAdd, onClose }: SubTaskModelProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && value.trim()) {
            onAdd();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div
            className="relative"
            style={{
                animation: 'modalSlideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
        >
            {/* Background glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />

            {/* Modal container */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-2xl p-5 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Subtask
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors group"
                    >
                        <svg
                            className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Input field */}
                <div className="relative mb-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter subtask description..."
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                    {value && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            Press Enter ↵
                        </div>
                    )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onAdd}
                        disabled={!value.trim()}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-blue-500/25"
                    >
                        Add Subtask
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>
        </div>
    );
}