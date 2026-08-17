import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Plus,
  CheckCircle2,
  Circle,
  Pencil,
  Trash2,
  ListTodo,
  CheckCheck,
  Clock,
  Loader2,
} from "lucide-react";
import API from "../utils/axios";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.35 },
  }),
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "done", label: "Completed" },
];

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState("all");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e?.preventDefault();
    if (!newTask.trim() || adding) return;
    setAdding(true);
    try {
      await API.post("/tasks", { title: newTask.trim() });
      setNewTask("");
      await fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await API.put(`/tasks/${task._id}`, { completed: !task.completed });
    fetchTasks();
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setEditingText(task.title);
  };

  const saveEdit = async () => {
    if (!editingText.trim()) return;
    await API.put(`/tasks/${editingId}`, { title: editingText.trim() });
    setEditingId(null);
    setEditingText("");
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const activeCount = tasks.length - completedCount;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "done") return task.completed;
    return true;
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/25 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-20 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 p-6 md:p-8 mb-6 text-white shadow-xl"
        >
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-3 border border-white/20">
              <Sparkles size={12} /> Productivity
            </span>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight flex items-center gap-2">
              <ListTodo size={28} className="opacity-90" />
              My Tasks
            </h1>
            <p className="mt-2 text-emerald-50/90 text-sm max-w-lg">
              Plan your study schedule, track assignments, and check things off as you go.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total", value: tasks.length, Icon: ListTodo },
            { label: "Active", value: activeCount, Icon: Clock },
            { label: "Done", value: completedCount, Icon: CheckCheck },
          ].map(({ label, value, Icon }) => (
            <div
              key={label}
              className="bg-white border border-emerald-100 rounded-2xl p-4 text-center shadow-sm"
            >
              <Icon size={18} className="mx-auto text-emerald-600 mb-1.5" />
              <p className="text-xl font-black text-emerald-900">{value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{label}</p>
            </div>
          ))}
        </div>

        {/* Add task */}
        <form
          onSubmit={createTask}
          className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm mb-6 flex gap-2 sm:gap-3"
        >
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task…"
            className="flex-1 border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-emerald-50/30 placeholder:text-gray-400"
          />
          <button
            type="submit"
            disabled={!newTask.trim() || adding}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md shadow-emerald-600/20 transition-all active:scale-95 shrink-0"
          >
            {adding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            <span className="hidden sm:inline">Add</span>
          </button>
        </form>

        {/* Filters */}
        {tasks.length > 0 && (
          <div className="flex gap-2 mb-5">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === f.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                    : "bg-white border border-emerald-100 text-emerald-700 hover:bg-emerald-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Task list */}
        <div className="space-y-3">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
              <p className="text-sm text-gray-500 font-medium">Loading tasks…</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-16 px-6 bg-white border border-emerald-100 rounded-3xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ListTodo size={28} />
              </div>
              <p className="font-bold text-emerald-900 text-lg">No tasks yet</p>
              <p className="text-sm text-gray-500 mt-1">Add your first task above to get started.</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm font-medium">
              No {filter === "active" ? "active" : "completed"} tasks.
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredTasks.map((task, i) => (
                <motion.div
                  key={task._id}
                  layout
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`flex justify-between items-center gap-3 bg-white px-4 py-3.5 rounded-2xl border transition-all ${
                    task.completed
                      ? "border-emerald-50 bg-emerald-50/30"
                      : "border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-200"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => toggleComplete(task)}
                      className="shrink-0 transition-transform active:scale-90"
                      aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={24} className="text-emerald-600" />
                      ) : (
                        <Circle size={24} className="text-gray-300 hover:text-emerald-400 transition-colors" />
                      )}
                    </button>

                    {editingId === task._id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
                        }}
                        autoFocus
                        className="flex-1 min-w-0 border border-emerald-300 px-3 py-1.5 rounded-xl text-sm focus:ring-2 focus:ring-emerald-300 focus:outline-none"
                      />
                    ) : (
                      <span
                        className={`text-sm sm:text-base font-medium truncate ${
                          task.completed ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {editingId === task._id ? (
                      <>
                        <button
                          type="button"
                          onClick={saveEdit}
                          className="px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => startEdit(task)}
                          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          aria-label="Edit task"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTask(task._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete task"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Tasks are saved to your account and sync across sessions.
        </p>
      </div>
    </div>
  );
}
