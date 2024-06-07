import Link from "next/link";

export default function NavBar() {
  return (
    <div className="bg-teal-400 w-full h-20 flex">
      <div className="flex flex-row items-center mr-auto ml-3">
        <div>
          <Link className="custom-nav-link" href={"/"}>
            Home
          </Link>
        </div>

        <div>
          <Link className="custom-nav-link" href={"/"}>
            Favourites
          </Link>
        </div>
      </div>

      <div className="flex flex-row items-center mr-3">
        <div>
          <Link className="custom-nav-link" href={"/signup"}>
            Sign up
          </Link>
        </div>
        <div>
          <Link className="custom-nav-link" href={"/login"}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
