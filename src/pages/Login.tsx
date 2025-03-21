import { useState, FC, FormEvent } from "react";
import { AppDispatch } from "../store";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "@/store/actions/authActions";

const LoginPage: FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ password: "323",  email }));
    navigate("/vibemeter");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-green-600 px-4 py-3 font-medium text-white hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
