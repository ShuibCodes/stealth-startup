import React, { useState } from "react";
import supabase from "../supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import image from "../images/pexels-cottonbro-4709291.jpg";
import logo from "../images/CodingKids - logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResendConfirmation = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim()
      });
      if (error) throw error;
      setError('Confirmation email resent. Please check your inbox.');
    } catch (err) {
      setError('Failed to resend confirmation email: ' + err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log('Attempting login with:', email.trim());
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password
      });

      if (error) {
        console.error('Login error:', error.message);
        
        if (error.message.includes('Email not confirmed')) {
          setError(
            <div>
              Email not confirmed. 
              <button 
                onClick={handleResendConfirmation}
                className="text-blue-500 underline ml-2"
              >
                Resend confirmation email
              </button>
            </div>
          );
        } else if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError(error.message);
        }
        return;
      }

      if (data?.user) {
        console.log('Login successful:', data.user.email);
        
        // Update last_sign_in timestamp
        const { error: updateError } = await supabase
          .from('users')
          .update({ last_sign_in: new Date().toISOString() })
          .eq('id', data.user.id);

        if (updateError) {
          console.error('Failed to update last_sign_in:', updateError);
        }

        navigate("/dashboard/users");
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex">
      <div className="bg-neutral-100 h-full flex flex-col items-center justify-center gap-[15px] w-1/2">
        <img className="mix-blend-multiply" src={logo} alt="codingKids logo" />
        {error && (
          <div className="text-red-500">
            {typeof error === 'string' ? error : error}
          </div>
        )}
        <form
          className="flex flex-col bg-white p-5 rounded-lg border w-[350px] shadow-sm"
          onSubmit={handleLogin}
        >
          <h1 className="text-lg font-semibold">Log In</h1>
          <p className="text-xs mb-5">Enter your information to log in</p>
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
          <span className="text-xs mb-4">Forgot password?</span>
          <button
            className={`bg-green-500 rounded p-1 text-white font-semibold text-lg mb-2 ${
              loading ? 'opacity-50' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup">
              <span className="text-green-600 underline">Sign up here</span>
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

export default Login;