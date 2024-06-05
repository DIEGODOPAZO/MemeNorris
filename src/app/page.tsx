"use client"
import Image from "next/image";
import DropDM from "@/components/DropDM"
import { getCategories, getJoke } from "@/lib/fetchUtils";
import { useEffect, useState } from "react";



export default function Home() {
  const [categories, setCategories] = useState([]);
  const [jokeCat, setJokeCat] = useState("All");
  const [joke, setJoke] = useState<ChuckNorrisJoke>();
  const [countClicks, setCountClick] = useState(0);

  function useEffectAsync(effect:any, inputs:any) {
    useEffect(() => {
        effect();
    }, inputs);
  };

  useEffectAsync(async () => {var cat = await getCategories(); setCategories(cat)}, []);
  useEffectAsync(async () => {var joke = await getJoke(jokeCat); setJoke(joke)}, [countClicks]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl text-center font-bold mt-8">MemeNorris</h1>
      <h1 className="text-2xl text-center my-4">Chuck Norris Memes</h1>
      <div>
      <Image src='/ChuckNorrisPhoto.png' alt='Chuck Norris Photo' width={300} height={300}/>
      </div>
    </div>
     <DropDM data={categories} setSel={setJokeCat}/>
    <div>
      <p>{joke?.value}</p>
      <button onClick={() => {setCountClick(countClicks => countClicks + 1)}}>New Joke</button>
    </div>
    </div>
  );
}
