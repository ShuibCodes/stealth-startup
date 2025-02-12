import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[15px]">
      <h2 className="text-5xl font-bold">Welcome</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="flex flex-col gap-[10px]" onSubmit={handleSignUp}>
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
        <input
          className="border bg-transparent w-[250px] rounded p-1"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 rounded p-1 text-white font-bold text-xl"
          type="submit"
        >
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">
          <span className="text-blue-600 underline">Sign in here</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
