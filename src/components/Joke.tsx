"use client"
import { useState } from "react";
import {getJoke, useEffectAsync} from "@/lib/fetchUtils";
import React from 'react';
import Loader from "@/components/Loader";

interface JokeProps {
  jokeCat: string;
}

export default function Joke({ jokeCat }: JokeProps) {

  const [joke, setJoke] = useState<ChuckNorrisJoke>();
  const [countClicks, setCountClick] = useState(0);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffectAsync(async () => {setIsDataLoading(true) ;var joke = await getJoke(jokeCat); setJoke(joke); setIsDataLoading(false)}, [countClicks]);


  return (
    <div className="flex flex-col text-white text-3xl font-bold">
      <p className="ml-auto mr-auto px-20">{joke?.value || "No joke available due to a problem calling the API"}</p>
      {isDataLoading ? <Loader/> : <button
        onClick={() => {
          setCountClick((countClicks) => countClicks + 1);
        }}
        className="bg-teal-500 hover:bg-teal-700 rounded-lg m-auto p-4 my-6 max-w-30"
      >
        New Joke
      </button>}
    </div>
  );
}
