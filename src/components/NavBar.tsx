import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function NavBar( {session} : any) {
  
  
  const handleLogOut = async () => {
    await supabase.auth.signOut();
  };


  return (
    <div className="bg-teal-400 w-full h-20 flex">
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
        session ? <button className="custom-nav-link" onClick={handleLogOut}>Log Out</button> : 
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
