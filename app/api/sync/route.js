import { NextResponse } from "next/server";

export async function POST(request) {
  const tasks = await request.json();

  console.log("Tasks received from client:", tasks);

  return NextResponse.json({
    success: true,
    message: "Tasks synced successfully",
  });
}
