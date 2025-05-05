// src/app/api/hr/sickness/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Temporär hartcodiert für Testzwecke (HR-Nutzer)
const HR_USER_ID = "8550602d-20c0-4f1e-a27e-271db2b9dec2";

export async function GET(req: NextRequest) {
  // TODO: Sobald Session-Authentifizierung funktioniert, dynamisch auslesen:
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  // const userId = session.user.id;

  const userId = HR_USER_ID;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (user?.role !== "HR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const sicknesses = await prisma.sickness.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { fromDate: "desc" },
  });

  return NextResponse.json({
    sicknesses: sicknesses.map((s) => ({
      id: s.id,
      worker: s.user.name,
      from: s.fromDate.toISOString(),
      to: s.toDate.toISOString(),
    })),
  });
}

export async function POST(req: NextRequest) {
  // TODO: Sobald Session-Authentifizierung funktioniert, dynamisch auslesen:
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user?.id) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  // const userId = session.user.id;

  const userId = HR_USER_ID;

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (currentUser?.role !== "HR") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { type, from, until, targetUserId } = body;

  if (!from || !until || !type || !targetUserId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (type === "SICKNESS") {
    await prisma.sickness.create({
      data: {
        userId: targetUserId,
        fromDate: new Date(from),
        toDate: new Date(until),
      },
    });
  } else if (type === "VACATION") {
    await prisma.$transaction([
      prisma.vacationRequest.create({
        data: {
          userId: targetUserId,
          startDate: new Date(from),
          endDate: new Date(until),
          status: "APPROVED",
        },
      }),
      prisma.user.update({
        where: { id: targetUserId },
        data: {
          vacationDays: { decrement: 1 },
        },
      }),
    ]);
  } else {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}


