"use client"
import NavBar from "@/components/NavBar";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Favourites(){
    const [session, setSession] = useState(null);
    const router = useRouter();
    
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


    return(
        <div>
            <NavBar session={session}/>
            <p>Hola</p>
        </div>
    )
}