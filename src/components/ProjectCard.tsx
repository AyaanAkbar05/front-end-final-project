
import type { Project } from "../types";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h3 className="font-semibold text-lg">{project.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{project.description}</p>
      <div className="mt-3">
        <Link to={`/projects/${project._id}`} className="text-sm underline">Open</Link>
      </div>
    </div>
  );
}
