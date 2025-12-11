import { useState } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onUpdate: (id: string, payload: Partial<Task>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function TaskItem({ task, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Task["status"]>(task.status);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdate(task._id, { name, description, status });
      setEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;
    setLoading(true);
    try {
      await onDelete(task._id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <li className="p-3 border rounded flex flex-col gap-2">
      {!editing ? (
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold">{task.name}</div>
            <div className="text-sm text-gray-600">{task.description}</div>
            <div className="text-xs mt-2">Status: <span className="font-medium">{task.status}</span></div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => setEditing(true)} className="px-3 py-1 border rounded text-sm">Edit</button>
            <button onClick={handleDelete} disabled={loading} className="px-3 py-1 border rounded text-sm text-red-600">Delete</button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded" />
          <input value={description} onChange={e => setDescription(e.target.value)} className="p-2 border rounded" />
          <select value={status} onChange={e => setStatus(e.target.value as Task["status"])} className="p-2 border rounded">
            <option value="todo">todo</option>
            <option value="in-progress">in-progress</option>
            <option value="done">done</option>
          </select>
          <div className="flex gap-2 mt-1">
            <button onClick={handleSave} disabled={loading} className="px-3 py-1 border rounded bg-slate-800 text-white text-sm">{loading ? "Saving..." : "Save"}</button>
            <button onClick={() => { setEditing(false); setName(task.name); setDescription(task.description); setStatus(task.status); }} className="px-3 py-1 border rounded text-sm">Cancel</button>
          </div>
        </div>
      )}
    </li>
  );
}
