"use client";

import { Table } from "@prisma/client";

export function TableCard({ table }: { table: Table }) {
  return (
    <div className="rounded-lg border p-4 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold">{table.name}</h2>
      <p className="text-sm text-muted-foreground">ID: {table.id}</p>
    </div>
  );
}