import { useEffect, useState } from 'react';
import API from '../axios';
import {
  MdDelete,
  MdEdit,
  MdCheckCircle,
  MdOutlineCheckCircleOutline
} from 'react-icons/md';

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const fetchTasks = async () => {
    const res = await API.get('/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!newTask.trim()) return;
    await API.post('/tasks', { title: newTask });
    setNewTask('');
    fetchTasks();
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
    await API.put(`/tasks/${editingId}`, { title: editingText });
    setEditingId(null);
    setEditingText('');
    fetchTasks();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
         My Tasks
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
          className="flex-1 border border-green-300 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={createTask}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full transition"
        >
          Add
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks added yet.</p>
      ) : (
        tasks.map(task => (
          <div
            key={task._id}
            className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-green-100 mb-3 hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? (
                  <MdCheckCircle className="text-green-600 text-2xl" />
                ) : (
                  <MdOutlineCheckCircleOutline className="text-gray-400 text-2xl" />
                )}
              </button>

              {editingId === task._id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="border px-3 py-1 rounded-lg focus:ring-2 focus:ring-green-300"
                />
              ) : (
                <span
                  className={`text-base font-medium ${
                    task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {editingId === task._id ? (
                <button
                  onClick={saveEdit}
                  className="text-sm text-green-700 font-semibold hover:underline"
                >
                  Save
                </button>
              ) : (
                <MdEdit
                  onClick={() => startEdit(task)}
                  className="text-green-700 cursor-pointer text-xl"
                />
              )}
              <MdDelete
                onClick={() => deleteTask(task._id)}
                className="text-red-500 cursor-pointer text-xl"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
}
