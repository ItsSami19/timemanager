import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, team, role, password } = body;

  if (!email || !name || !team || !role || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      team,
      role,
      password,
    },
  });

  return NextResponse.json(user);
}
