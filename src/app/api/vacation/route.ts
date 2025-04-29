// app/api/vacation/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const vacation = await prisma.vacationRequest.create({
    data,
  });

  return NextResponse.json(vacation);
}
