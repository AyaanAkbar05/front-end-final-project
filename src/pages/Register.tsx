import AuthForm from "../components/AuthForm";
import client from "../api/client";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  //Submit Handler
  const handleSubmit = async ({ username, email, password }: any) => {
    await client.post("/users/register", { username, email, password });
    nav("/login");
  };

   return (
    <div>
      <AuthForm isRegister onSubmit={handleSubmit} />

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  );
}
