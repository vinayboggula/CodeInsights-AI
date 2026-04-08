import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  // ✅ Individual states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔍 Debug (optional)
    console.log({ name, email, password });

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);

      const { data } = await api.post("/auth/signup", {
        name,
        email,
        password
      });

      if (data.success) {
        toast.success("Account created!");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Signup error:", error);

      toast.error(
        error.response?.data?.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[url('/codeInsigth.png')] opacity-85 bg-center mx-auto items-center justify-center h-screen">

      <div className="w-full bg-white opacity-95  max-w-sm p-6 border shadow-xl rounded-lg">

        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className=" space-y-4">

          {/* Name */}
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border-b-2 outline-none"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?
          <NavLink to="/login" className="text-blue-500 ml-1">
            Login
          </NavLink>
        </p>

      </div>

    </div>
  );
};

export default Signup;