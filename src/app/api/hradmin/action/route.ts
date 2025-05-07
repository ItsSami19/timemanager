import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { action, userId } = await req.json();

  try {
    if (action === "PROMOTE") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "SUPERVISOR" },
      });
    } else if (action === "DEMOTE") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "EMPLOYEE" },
      });
    } else if (action === "DELETE") {
      await prisma.user.delete({ where: { id: userId } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Action failed" }, { status: 500 });
  }
}
