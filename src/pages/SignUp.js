import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import image from "../images/pexels-cottonbro-4709291.jpg";

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
    <div className="h-full flex">
      <div className="bg-neutral-100 h-full flex flex-col items-center justify-center gap-[15px] w-1/2">
        <h2 className="text-5xl text-blue-500 font-bold mb-3">CodingKids</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form
          className="flex flex-col bg-white p-5 rounded-lg border w-[350px] shadow-sm"
          onSubmit={handleSignUp}
        >
          <h1 className="text-lg font-semibold">Register</h1>
          <p className="text-xs mb-5">
            Enter your informations to create a new account
          </p>
          <span className="text-sm mb-1">Email</span>
          <input
            className="border bg-transparent w-full rounded p-1 mb-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span className="text-sm mb-1">Password</span>
          <input
            className="border bg-transparent w-full rounded p-1 mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="text-sm mb-1">Confirm password</span>
          <input
            className="border bg-transparent w-full rounded p-1 mb-3"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className="bg-blue-500 rounded p-1 text-white font-semibold text-lg mb-2"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-600 underline">Sign in here</span>
            </Link>
          </p>
        </form>
      </div>
      <div className="h-full w-1/2 flex">
        <img className="object-cover" src={image} alt="a kid coding" />
      </div>
    </div>
  );
};

export default SignUp;
