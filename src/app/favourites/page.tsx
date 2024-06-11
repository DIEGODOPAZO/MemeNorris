"use client"
import NavBar from "@/components/NavBar";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Favourites(){
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();
    const [error, setError] = useState(null);
    const [jokes, setJokes] = useState<UserJokes>();
    
    useEffect(() => {
      async function checkSession() {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
  
        if (!session) {
          router.push("/login");
        }
      }
      // Escuchar cambios en la sesión de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session); // Actualizar el estado de la sesión cuando cambia la autenticación
      if (!session) {
        router.push("/");
      }
    });

    checkSession();
    // Limpieza al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
      
    }, [router]);
    
    useEffect(() => {
      
    }, [])

    return(
        <div>
            <NavBar session={session}/>
            <p>Hola</p>
        </div>
    )
}