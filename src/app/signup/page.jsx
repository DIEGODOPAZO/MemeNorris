"use client";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de registrarse
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al registrarse:", error.message);
      setError(error.message);
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        provider: "github",
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de registrarse
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <h1 className="text-white text-6xl my-7">Sign Up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp} className="flex flext-col">
        <div className="flex flex-col my-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="my-3 p-4 text-2xl"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="my-3 p-4 text-2xl"
          />
          <button
            type="submit"
            className="p-3 text-2xl mb-4 bg-teal-500 hover:bg-teal-700 rounded text-white"
          >
            Sign Up
          </button>
        </div>
      </form>
      <button
        onClick={handleGitHubSignUp}
        className="p-3 bg-teal-500 text-2xl hover:bg-teal-700 rounded text-white"
      >
        Sign Up with GitHub
      </button>
    </div>
  );
}
