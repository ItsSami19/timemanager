import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id, role } = body;

  const updated = await prisma.user.update({
    where: { id },
    data: { role },
  });

  return NextResponse.json(updated);
}
