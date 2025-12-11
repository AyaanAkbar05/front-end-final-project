import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../api/client";
import { createTask, updateTask, deleteTask } from "../hooks/useTasks";
import { updateProject } from "../hooks/useProjects";
import Loading from "../components/Loading";
import EditProjectForm from "../components/EditProjectForm";
import TaskItem from "../components/TaskItem";
import type { Project, Task } from "../types";
import { deleteProject } from "../hooks/useProjects";
import { useNavigate } from "react-router-dom";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState(false);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [tasksError, setTasksError] = useState<string | null>(null);


  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!projectId) return;
    setLoading(true);

    client.get(`/projects/${projectId}`)
      .then(res => {
        if (mounted) setProject(res.data);
      })
      .catch(() => {
        if (mounted) setProject(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [projectId]);

  useEffect(() => {
    let mounted = true;
    if (!projectId) return;

    setTasksLoading(true);
    setTasksError(null);

    client.get(`/projects/${projectId}/tasks`)
      .then(res => {
        if (mounted) setTasks(res.data);
      })
      .catch(err => {
        if (mounted) setTasksError(err?.message || "Error loading tasks");
      })
      .finally(() => {
        if (mounted) setTasksLoading(false);
      });

    return () => { mounted = false; };
  }, [projectId]);

  const handleProjectSave = async (payload: { name: string; description: string }) => {
    if (!projectId) return;
    const updated = await updateProject(projectId, payload);
    setProject(updated);           
    setEditingProject(false);
  };

  const nav = useNavigate();

const handleDeleteProject = async () => {
  if (!projectId) return;

  const confirmed = confirm("Are you sure you want to delete this project?");
  if (!confirmed) return;

  try {
    await deleteProject(projectId);
    nav("/projects");
  } catch (err) {
    alert("Failed to delete project");
  }
};

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId) return;
    setCreating(true);
    try {
      const newTask = await createTask(projectId, {
        name: taskName,
        description: taskDesc,
        status: "todo"
      });

      setTasks(prev => [newTask, ...prev]);
      setTaskName("");
      setTaskDesc("");
    } catch (err) {
      alert("Could not create task");
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateTask = async (id: string, payload: Partial<Task>) => {
    const updated = await updateTask(id, payload);

    setTasks(prev =>
      prev.map(t => (t._id === id ? updated : t))
    );
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);

    setTasks(prev => prev.filter(t => t._id !== id));
  };

  if (loading) return <Loading />;

  if (!project) return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        Project not found. <Link to="/projects" className="underline">Back</Link>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-start">
          <div>
            {!editingProject ? (
              <>
                <h2 className="text-xl font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-600">{project.description}</p>
              </>
            ) : null}
          </div>
          <div className="flex gap-2">
            {!editingProject ? (
                <>
              <button onClick={() => setEditingProject(true)} className="px-3 py-1 border rounded">
                Edit Project
              </button>
              <button
        onClick={handleDeleteProject}
        className="px-3 py-1 border rounded text-red-600"
      >
        Delete
      </button>
              </>
            ) : null}
            <Link to="/projects" className="px-3 py-1 border rounded">Back</Link>
          </div>
        </div>

        {editingProject && (
          <EditProjectForm
            project={project}
            onSave={handleProjectSave}
            onCancel={() => setEditingProject(false)}
          />
        )}

        <hr className="my-4" />

        <h3 className="font-semibold mb-2">Tasks</h3>

        <form onSubmit={handleCreateTask} className="mb-4">
          <div className="flex gap-2">
            <input
              required
              value={taskName}
              onChange={e => setTaskName(e.target.value)}
              placeholder="Task name"
              className="flex-1 p-2 border rounded"
            />
            <button disabled={creating} className="px-3 py-1 border rounded">
              {creating ? "Adding..." : "Add"}
            </button>
          </div>
          <input
            value={taskDesc}
            onChange={e => setTaskDesc(e.target.value)}
            placeholder="Short description"
            className="w-full mt-2 p-2 border rounded"
          />
        </form>

        {tasksLoading && <Loading />}
        {tasksError && <div className="text-red-500 text-sm mb-2">{tasksError}</div>}

        <ul className="space-y-3">
          {tasks.length ? (
            tasks.map(t => (
              <TaskItem
                key={t._id}
                task={t}
                onUpdate={handleUpdateTask}
                onDelete={handleDeleteTask}
              />
            ))
          ) : (
            !tasksLoading && <div className="text-gray-600">No tasks yet</div>
          )}
        </ul>
      </div>
    </div>
  );
}
