import { deleteFavorite } from "@/lib/fetchUtils";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import Loader from "./Loader";

interface FavouriteCardProps {
    joke: UserJokes;
    session: Session | null;
    onRemove: (jokeId: string) => void;
}
export default function FavourtiteCard({joke, session, onRemove} : FavouriteCardProps){

    const [isDataLoading, setIsDataLoading] = useState(false);

    async function removeFromFavourite(){
        setIsDataLoading(true);
        const jokee: ChuckNorrisJoke = {
            categories: [], // Asigna categorías según sea necesario
            created_at: '', // Asigna la fecha de creación
            icon_url: '', // Asigna la URL del icono
            id: joke.joke_id,
            updated_at: '', // Asigna la fecha de actualización
            url: '', // Asigna la URL del chiste
            value: joke.joke,
          };
        const error = await deleteFavorite(session?.user.id, jokee);
        setIsDataLoading(false);

        if (!error) {
            onRemove(joke.joke_id);
        }else{
            alert("Error while deleting favourite: " + error.message);
        }
      }

    return(
        <div className="bg-teal-350 my-5 p-5 font-semibold text-2xl flex flex-row items-center shadow-lg">
            <br/>
            <div className="ml-10 mr-auto text-black">
            {joke.joke}
            </div>
            <div>
                {isDataLoading ? <Loader/> : <button onClick={removeFromFavourite} className="bg-red-400 hover:bg-red-600 text-white justify-end mr-10 p-4 rounded">
                    Del
                </button>}
            </div>
            <br />
        </div>
    )
}
