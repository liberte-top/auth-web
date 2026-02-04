import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);
  if (url.pathname === "/__health__") {
    return NextResponse.json({
      status: "ok",
      service: "auth-web",
      version: process.env.NEXT_PUBLIC_GIT_SHA ?? "unknown",
      timestamp: new Date().toISOString(),
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/__health__"],
};
