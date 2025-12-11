
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold">TaskMaster</h1>
        <p className="mt-2 text-gray-700">Final Project- Per Scholas</p>
        <div className="mt-6 flex gap-3">
  <Link className="px-4 py-2 border rounded" to="/login">Login</Link>
  <Link className="px-4 py-2 border rounded" to="/register">Register</Link>
</div>
      </div>
    </div>
  );
}
