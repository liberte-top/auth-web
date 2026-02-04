export function GET() {
  return Response.json({
    status: "ok",
    service: "auth-web",
    version: process.env.NEXT_PUBLIC_GIT_SHA ?? "unknown",
    timestamp: new Date().toISOString(),
  });
}
