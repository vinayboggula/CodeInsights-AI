import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const { getMe } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    try {
      setGoogleLoading(true);
      const token = credentialResponse.credential;

      const { data } = await api.post("/auth/google", { token });

      localStorage.setItem("token", data.token);

      await getMe();
      toast.success("Google login successful 🎉");

      navigate("/home");

    } catch (err) {
      toast.error("Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", data.token);
      await getMe();

      toast.success("Login successful 🎉");
      navigate("/home");

    } catch (error) {
      console.error("Login Error:", error.message || error);

      toast.error(
        error.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-[url('/codeInsigth.png')] opacity-85 bg-cover bg-center justify-center h-screen">
      <div className="w-full max-w-sm p-6 border bg-white opacity-95 shadow-xl rounded-lg">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-black">

            <span >Code<span className="opacity-75">Insights</span> AI </span>
          </h1>
          <p className="font-light">
            Enter your credentials to log in
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border-b-2 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border-b-2 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t"></div>
          <span className="mx-2 text-sm text-gray-500">OR</span>
          <div className="flex-grow border-t"></div>
        </div>

        <div className="mt-4 flex justify-center">
          {googleLoading ? (
            <p>Signing in with Google...</p>
          ) : (
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => toast.error("Google Login Failed")}
            />
          )}
        </div>

        <p className="text-sm text-center mt-4">
          Don't have an account?
          <NavLink to="/signup" className="text-blue-500 ml-1">
            Sign Up
          </NavLink>
        </p>

      </div>
    </div>
  );
};

export default Login;