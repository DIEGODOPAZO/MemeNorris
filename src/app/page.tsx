"use client"
import Image from "next/image";
import DropDM from "@/components/DropDM"
import { useState } from "react";
import Joke from "@/components/Joke";



export default function Home() {
  
  const [jokeCat, setJokeCat] = useState("All");
  
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-7xl text-center font-bold mt-8">MemeNorris</h1>
      <h1 className="text-2xl text-center my-4">Chuck Norris Memes</h1>
      <div>
      <Image src='/ChuckNorrisPhoto.png' alt='Chuck Norris Photo' width={300} height={300}/>
      </div>
    </div>
     <DropDM setSel={setJokeCat}/>
     <Joke jokeCat={jokeCat}/>
    </div>
  );
}
