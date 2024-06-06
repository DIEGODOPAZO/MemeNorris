"use client"
import { useState } from "react";
import {getJoke, useEffectAsync} from "@/lib/fetchUtils";
import React from 'react';

interface JokeProps {
  jokeCat: string;
}

export default function Joke({ jokeCat }: JokeProps) {

  const [joke, setJoke] = useState<ChuckNorrisJoke>();
  const [countClicks, setCountClick] = useState(0);

  useEffectAsync(async () => {var joke = await getJoke(jokeCat); setJoke(joke)}, [countClicks]);


  return (
    <div className="flex flex-col text-white text-3xl font-bold">
      <p className="ml-auto mr-auto px-20">{joke?.value}</p>
      <button
        onClick={() => {
          setCountClick((countClicks) => countClicks + 1);
        }}
        className="bg-teal-500 hover:bg-teal-700 rounded-lg m-auto p-4 my-6 max-w-30"
      >
        New Joke
      </button>
    </div>
  );
}
