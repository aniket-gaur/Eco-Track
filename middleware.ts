import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard"]);


export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  const { sessionClaims } = await auth(); // Await authentication object
  const role = sessionClaims?.metadata?.role; // Extract role safely

  // Redirect admin users to /admin if they just signed in
  if (role === "admin" && req.nextUrl.pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }


  return NextResponse.next();




});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
