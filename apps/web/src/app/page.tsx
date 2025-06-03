// 📁 File: apps/web/src/app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  //const session = null; // simulate not logged


  return (
    <main className="p-8 text-center">
      <h1 className="text-4xl font-bold">Bienvenue sur Boardgame Social App 🎲</h1>
      <p className="mt-4 text-lg">
        Une application pour créer et rejoindre des tables de jeux de société avec tes amis.
      </p>

      {session ? (
        <>
          <p className="mt-6 text-xl">Connecté en tant que <strong>{session.user?.name || session.user?.email}</strong></p>
          <Link
            href="/tables"
            className="mt-4 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Voir mes tables
          </Link>
          <br />
          <a
            href="/api/auth/signout"
            className="mt-4 inline-block text-sm text-red-500 hover:underline"
          >
            Se déconnecter
          </a>
        </>
      ) : (
        <a
          href="/api/auth/signin"
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Se connecter avec GitHub
        </a>
      )}
    </main>
  );
}
