import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[15px]">
      <h2 className="text-5xl font-bold">Welcome</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="flex flex-col gap-[10px]" onSubmit={handleLogin}>
        <input
          className="border bg-transparent w-[250px] rounded p-1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border bg-transparent w-[250px] rounded p-1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 rounded p-1 text-white font-bold text-xl"
          type="submit"
        >
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-blue-600 underline">Sign up here</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
