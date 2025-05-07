import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { id } = body;

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
