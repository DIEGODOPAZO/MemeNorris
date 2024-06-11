"use client"
import NavBar from "@/components/NavBar";
import { getFavorites, useEffectAsync } from "@/lib/fetchUtils";
import { supabase } from "@/lib/supabase";
import { PostgrestError, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Favourites(){
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();
    const [err, setError] = useState<PostgrestError | null>(null);
    const [jokes, setJokes] = useState<UserJokes[] | null>([]);
    
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
    
    
  async function getJokes(){
    if (session?.user.id) {
      const { error, UserJokes } = await getFavorites(session.user.id);
      setError(error);
      setJokes(UserJokes);
      console.log(jokes);
    }
  }    

   useEffectAsync(getJokes, [session]);

    return(
        <div>
            <NavBar session={session}/>
            {err != null ? <div><h2> An error ocurred: </h2> <p>{err.details}</p></div> :
              jokes?.map((joke, index) => (<p>{joke.joke}</p>))
            }
        </div>
    )
}