import React, { useState } from "react";
import { useAllProjects, createProject } from "../hooks/useProjects";
import Loading from "../components/Loading";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsPage() {
  const { data: projects, loading, error } = useAllProjects();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);
  const [localProjects, setLocalProjects] = useState<any[]>([]);

  React.useEffect(() => {
    if (projects) setLocalProjects(projects);
  }, [projects]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const p = await createProject({ name, description });
      setLocalProjects(prev => [p, ...prev]);
      setName("");
      setDescription("");
    } catch (err) {
      alert("Could not create project");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        <form onSubmit={handleCreate} className="mb-6 bg-white p-4 rounded shadow">
          <div className="flex gap-2">
            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Project name" className="flex-1 p-2 border rounded"/>
            <button disabled={creating} className="px-4 py-2 border rounded">Create</button>
          </div>
          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" className="w-full mt-3 p-2 border rounded" />
        </form>

        {loading && <Loading />}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          {localProjects?.length ? localProjects.map((p: any) => <ProjectCard key={p._id} project={p} />) : (
            !loading && <div className="p-4 text-gray-600">No projects yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
