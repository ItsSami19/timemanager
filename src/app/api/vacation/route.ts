// app/api/vacation/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import VacationPage from "@/app/vacations/page";


export async function POST(req: NextRequest) {
  const data = await req.json();

  const vacation = await prisma.vacationRequest.create({
    data,
  });

  return NextResponse.json(vacation);
}
//GET 

export async function GET() {
  try {
    const vacations = await prisma.vacationRequest.findMany();
    return NextResponse.json(vacations);
  } catch (error) {
    console.error("error fetching vacations:" , error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
