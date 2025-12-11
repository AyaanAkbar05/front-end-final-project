
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
  const auth = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    auth.logout();
    nav("/login");
  };

  return (
    <nav className="bg-black shadow-sm text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-semibold text-lg">TaskMaster</Link>
        <div className="flex items-center gap-4">
  {auth.user && (
    <Link to="/projects" className="text-sm">Projects</Link>
  )}

  {auth.user ? (
    <>
      <span className="text-sm">Hi, {auth.user.username}</span>
      <button onClick={handleLogout} className="text-sm px-3 py-1 border rounded">Logout</button>
    </>
  ) : (
    <>
      <Link to="/login" className="text-sm px-3 py-1 border rounded">Login</Link>
      <Link to="/register" className="text-sm px-3 py-1 border rounded">Register</Link>
    </>
  )}
</div>

      </div>
    </nav>
  );
}
