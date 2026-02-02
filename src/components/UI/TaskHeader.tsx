import { BiRedo, BiUndo } from "react-icons/bi";
import { useTasksContext } from "../../context/TaskContext";


export default function TaskHeader() {
    const { undo, redo, canUndo, canRedo } = useTasksContext();

    return (
        <div className="flex items-center justify-between mb-6">
            <div />

            <div className="flex gap-2">
                <button
                    onClick={undo}
                    disabled={!canUndo}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-white disabled:opacity-40 flex items-center"
                >
                    <BiUndo />
                    Undo
                </button>

                <button
                    onClick={redo}
                    disabled={!canRedo}
                    className="px-3 py-1 rounded-lg bg-gray-700 text-white disabled:opacity-40 flex items-center"
                >
                    <BiRedo /> Redo
                </button>
            </div>
        </div >
    );
}
