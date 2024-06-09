"use client"
import { useState } from "react";
import {getJoke, useEffectAsync} from "@/lib/fetchUtils";
import React from 'react';
import Loader from "@/components/Loader";
import { Session } from "@supabase/supabase-js";

interface JokeProps {
  jokeCat: string;  
}

export interface SessionProps {
  session: Session | null;
}

export default function Joke({ jokeCat }: JokeProps, { session } : SessionProps) {

  const [joke, setJoke] = useState<ChuckNorrisJoke>();
  const [countClicks, setCountClick] = useState(0);
  const [addFav, setAddFav] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffectAsync(async () => {setIsDataLoading(true) ;var joke = await getJoke(jokeCat); setJoke(joke); setAddFav(false); setIsDataLoading(false)}, [countClicks]);


  return (
    <div className="flex flex-col text-white text-3xl font-bold">
      <p className="ml-auto mr-auto px-20">{joke?.value || "No joke available due to a problem calling the API"}</p>
      {isDataLoading ? <Loader/> : <div className="flex flex-row">

      <button
        onClick={() => {
          setCountClick((countClicks) => countClicks + 1);
        }}
        className="bg-teal-500 hover:bg-teal-700 rounded-lg ml-auto mr-3 p-4 my-6 max-w-30"
      >
        New Joke
      </button>

      <button
        onClick={() => {
          setAddFav(true);
        }}
        disabled={addFav}
        className={`bg-teal-500 hover:bg-teal-700 rounded-lg mr-auto ml-3 p-4 my-6 max-w-30 ${addFav ? 'hidden' : ''}`}
      >
        Add Favourites
      </button>

      <button
        onClick={() => {
          setAddFav(false);
        }}
        disabled={!addFav}
        className={`bg-red-500 hover:bg-red-700 rounded-lg mr-auto ml-3 p-4 my-6 max-w-30 ${!addFav ? 'hidden' : ''}`}
      >
        Remove Favourite
      </button>

        </div>}
    </div>
  );
}
