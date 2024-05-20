'use client';
import { createClient } from "@/lib/client";

export default function AuthPage() {
  const handleLogin = (provider: "google" | "facebook") => {
    const supabase = createClient();
     supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/home/auth/callback",
      },
    });
  };
  return (
    <div className="m-4 flex justify-center ">
      <h1 className="text-3xl text-center m-2">
        Iniciar sesión en Heroes Club
      </h1>
      <button
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => handleLogin("google")}
      >
        iniciar sesión con google
      </button>
    </div>
  );
}
