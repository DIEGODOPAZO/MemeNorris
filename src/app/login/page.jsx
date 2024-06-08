"use client";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-slate-950 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["github"]}
          theme="dark"
        />
      </div>
      <div className="mt-8">
      <Link
          href="/"
          className="bg-slate-400 p-5 text-2xl my-10 rounded text-black font-semibold hover:bg-slate-300"
        >
          Home Page
        </Link>
      </div>
    </div>
  );
}
