
import AuthForm from "../components/AuthForm";
import client from "../api/client";
import useAuth from "../hooks/useAuth";
import type { UserPayload } from "../types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const auth = useAuth();
  const nav = useNavigate();

  //Submit Handler
  const handleSubmit = async ({ email, password }: { email: string; password: string }) => {
    const res = await client.post("/users/login", { email, password });
    const { token, dbUser } = res.data;
    const user: UserPayload = {
      _id: dbUser._id,
      username: dbUser.username,
      email: dbUser.email,
      role: dbUser.role
    };
    auth.login(token, user);
    nav("/projects");
  };

   return (
    <div>
      <AuthForm onSubmit={handleSubmit} />

      <p className="mt-4 text-center text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </div>
  );
}
