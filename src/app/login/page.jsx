"use client";
import { useState } from "react";
import { SupabaseClient, createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de iniciar sesión
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de iniciar sesión
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto">
      <h1 className="text-white text-6xl my-7">LogIn</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
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
          <button type="submit" className="p-3 text-2xl mb-4 bg-teal-500 hover:bg-teal-700 rounded text-white">LogIn with email</button>
        </div>
      </form>
      <button onClick={handleGitHubLogin} className="p-3 text-2xl mb-4 bg-teal-500 hover:bg-teal-700 rounded text-white">LogIn with GitHub</button>
    </div>
  );
}
