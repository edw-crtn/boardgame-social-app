// 📁 File: apps/web/src/app/tables/page.tsx
import { Table } from "@prisma/client";
import { TableCard } from "@/components/TableCard";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function createTable(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  const name = formData.get("name")?.toString();
  if (!name || name.length < 2) {
    throw new Error("Le nom est requis et doit faire au moins 2 caractères.");
  }

  await prisma.table.create({
    data: {
      name,
      players: {
        connect: { id: session.user.id },
      },
    },
  });

  revalidatePath("/tables");
  redirect("/tables");
}

export default async function TablesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const tables: Table[] = await prisma.table.findMany({
    where: {
      players: {
        some: {
          id: session.user.id,
        },
      },
    },
  });

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Tables</h1>

      <form action={createTable} className="mb-8 space-y-4">
        <label className="block">
          <span className="text-lg font-medium">Table Name</span>
          <input
            name="name"
            type="text"
            className="mt-1 block w-full rounded border border-gray-300 p-2 text-black"
            placeholder="Enter a new table name"
            required
            minLength={2}
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          ➕ Create Table
        </button>
      </form>

      <div className="grid gap-4">
        {tables.map((table) => (
          <TableCard key={table.id} table={table} />
        ))}
      </div>
    </main>
  );
}
