import { authMiddleware } from "@clerk/nextjs/server";
 
export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/"]
  });
 
export const config = {
  matcher: ['/((?! next/image| next/static|favicon.ico).*)'],
};