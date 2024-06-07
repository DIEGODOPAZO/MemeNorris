"use client"
import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey= process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase= createClient(supabaseUrl, supabaseAnonKey);


export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error al registrarse:", error.message);
      setError(error.message);
    }
  };

  const handleGitHubSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        provider: 'github',
      });

      if (error) {
        setError(error.message);
      } else {
        // Redireccionar a la página principal o a donde desees después de registrarse
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Registro</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignUp}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Registrarse con correo</button>
      </form>
      <button onClick={handleGitHubSignUp}>Registrarse con GitHub</button>
    </div>
  );
}
