"use client";
import { signIn } from "next-auth/react";

export default function SignInWithGoogle() {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => signIn("google")}
      >
        Sign in with Google
      </button>
    </div>
  );
}
