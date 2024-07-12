import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRotues =  createRouteMatcher([
    '/',
    '/upcoming',
    '/recordings',
    'previous',
    '/personal-room',
    '/meeting(.*)',
])

export default clerkMiddleware((auth,req)=>{
    if(protectedRotues(req)) auth().protect();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};