"use client"
import { useState } from 'react';
import { SupabaseClient, createClient } from '@supabase/supabase-js'



const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey= process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase= createClient(supabaseUrl, supabaseAnonKey);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      setError(error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${location.origin}/auth/callback`,
      }
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de iniciar sesión
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión con correo</button>
      </form>
      <button onClick={handleGitHubLogin}>Iniciar sesión con GitHub</button>
    </div>
  );
}