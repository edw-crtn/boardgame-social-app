// apps/web/src/app/login/page.tsx
"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black text-white">
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 bg-gray-800 hover:bg-gray-600 rounded"
      >
        Sign in with GitHub
      </button>
    </main>
  );
}
