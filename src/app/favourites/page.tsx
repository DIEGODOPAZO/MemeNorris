"use client";
import FavourtiteCard from "@/components/FavouriteCard";
import Loader from "@/components/Loader";
import NavBar from "@/components/NavBar";
import { getFavorites, useEffectAsync } from "@/lib/fetchUtils";
import { supabase } from "@/lib/supabase";
import { PostgrestError, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Favourites() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();
  const [err, setError] = useState<PostgrestError | null>(null);
  const [jokes, setJokes] = useState<UserJokes[] | null>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (!session) {
        router.push("/login");
      }
    }
    // Escuchar cambios en la sesión de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session); // Actualizar el estado de la sesión cuando cambia la autenticación
        if (!session) {
          router.push("/");
        }
      }
    );

    checkSession();
    // Limpieza al desmontar el componente
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  async function getJokes() {
    if (session?.user.id) {
      setIsFetching(true);
      const { error, UserJokes } = await getFavorites(session.user.id);
      setError(error);
      setJokes(UserJokes);
      setIsFetching(false);
    }
  }

  useEffectAsync(getJokes, [session]);

  const handleRemoveJoke = (jokeId: string) => {
    setJokes(
      (prevJokes) =>
        prevJokes?.filter((joke) => joke.joke_id !== jokeId) || null
    );
  };
  return (
    <div>
      <NavBar session={session} />
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          {err != null ? (
            <div className="flex flex-col items-center justify-center h-screen font-semibold text-white">
              <h2 className="text-3xl"> An error occurred: </h2>
              <p className="text-lg">{err.message}</p>
            </div>
          ) : (
            jokes?.map((joke, index) => (
              <FavourtiteCard
                key={index}
                joke={joke}
                session={session}
                onRemove={handleRemoveJoke}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
