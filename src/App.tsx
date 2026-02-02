import FilterBar from "./components/Filters/FilterBar";
import TaskForm from "./components/Task/TaskForm";
import TaskItem from "./components/Task/TaskItem";
import TaskHeader from "./components/UI/TaskHeader";
import { TaskProvider, useTasksContext } from "./context/TaskContext";
import type { Task } from "./types/task";

function Content() {
  const { filteredTasks } = useTasksContext();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-start justify-center p-2 md:p-8 lg:p-12 min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8 animate-fadeIn">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              Task Manager
            </h1>
            <p className="text-gray-400 text-lg">Organize your day with style</p>
          </div>

          {/* Main card */}
          <div className="relative group" style={{ animation: 'slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Card content */}
            <div className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-4 md:p-8 shadow-2xl">
              {/* Task Form */}
              <div className="mb-6">
                <TaskForm />
              </div>

              {/* Filters and Sort */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <FilterBar />
                  {/* <SortBar /> */}
                </div>
              </div>

              {/* Undo & Redo */}
              <div>
                <TaskHeader />
              </div>

              {/* Task List */}
              <div className="space-y-1">
                {filteredTasks.length === 0 ? (
                  <div className="text-center py-16" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div className="inline-block p-6 bg-gray-700/30 rounded-full mb-4">
                      <svg className="w-16 h-16 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks yet</h3>
                    <p className="text-gray-500">Create your first task to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-4 px-1">
                      <span className="text-sm font-medium text-gray-400">
                        {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">
                          {filteredTasks.filter((t) => t.completed).length} completed
                        </span>
                      </div>
                    </div>
                    {filteredTasks.map((task: Task, index) => (
                      <div
                        key={task.id}
                        style={{
                          animation: `slideInTask 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.05}s backwards`
                        }}
                      >
                        <TaskItem task={task} />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-gray-500 text-sm" style={{ animation: 'fadeIn 1s ease-out 0.5s backwards' }}>
            <p>Built with ❤️ using React & TypeScript</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 1;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideInTask {
          from {
            opacity: 0;
            transform: translateX(-20px);
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

export default function App() {
  return (
    <TaskProvider>
      <Content />
    </TaskProvider>
  );
}