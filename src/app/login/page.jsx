"use client";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {

  const router = useRouter();
  
  useEffect(() => {
    // Verificar el estado de autenticación actual al montar el componente
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      }
    });

    // Registrar el listener para cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        router.push("/");
      } else if (event === "SIGNED_OUT") {
        router.push("/login");
      }
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["github"]}
          theme="dark"
        />
      </div>
      <div className="mt-8">
      <Link
          href="/"
          className="bg-slate-400 p-5 text-2xl my-10 rounded text-black font-semibold hover:bg-slate-300"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}
