import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
 
export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/"]
  });
 
export const config = {
  matcher: ['/((?! next/image| next/static|favicon.ico).*)'],
};