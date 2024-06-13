import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function NavBar( {session} : any) {
  
  
  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };


  return (
    <div className="bg-teal-400 w-full h-13 flex">
      <div className="flex flex-row items-center mr-auto ml-3">
        <div>
          <Link className="custom-nav-link" href={"/"}>
            Home
          </Link>
        </div>

        <div>
          <Link className="custom-nav-link" href={"/favourites"}>
            Favourites
          </Link>
        </div>
      </div>

      {
        session ? <button className="bg-red-500 text-white text-center text-xl my-2 mx-2 py-2 px-4 rounded hover:bg-red-700" onClick={handleLogOut}>Log Out</button> : 
        <div className="flex flex-row items-center mr-3">
        <div>
          <Link className="custom-nav-link" href={"/login"}>
            Log In
          </Link>
        </div>
      </div>
      }
    </div>
  );
}
