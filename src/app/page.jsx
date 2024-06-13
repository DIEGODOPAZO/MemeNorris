"use client"
import Image from "next/image";
import DropDM from "@/components/DropDM"
import { useEffect, useState } from "react";
import Joke from "@/components/Joke";
import NavBar from "@/components/NavBar";
import { supabase } from "@/lib/supabase";



export default function Home() {
  
  const [jokeCat, setJokeCat] = useState("All");
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    }
    
    // Escuchar cambios en la sesión de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session); // Actualizar el estado de la sesión cuando cambia la autenticación
    });

    checkSession();
    // Limpieza al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  return (
    <div>
      <NavBar session={session}/>
      <div className="flex flex-col items-center justify-center text-white">
      <h1 className=" text-5xl md:text-7xl text-center font-bold mt-8">MemeNorris</h1>
      <h1 className="text-lg md:text-2xl text-center my-4">Chuck Norris Memes</h1>
      <div>
      <Image src='/ChuckNorrisPhoto.png' alt='Chuck Norris Photo' width={300} height={300}/>
      </div>
    </div>
     <DropDM setSel={setJokeCat}/>
     <Joke jokeCat={jokeCat} session={session}/>
    </div>
  );
}
