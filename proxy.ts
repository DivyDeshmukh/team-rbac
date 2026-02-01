import { NextRequest, NextResponse } from "next/server";
import {
    authMiddleware
} from "./lib/middlewares"

const { authGuard } = authMiddleware;

type GuardHandler = (req: NextRequest) => Promise<NextResponse | void> | NextResponse | void;

interface MiddlewareRule {
    path: string;
    handlers: GuardHandler[];
}

// Define protected route guards here
const protectedRoutes: MiddlewareRule[] = [
    {
        path: "/api/auth/logout",
        handlers: [authGuard]
    },
    {
        path: "/api/auth/me",
        handlers: [authGuard]
    },
    {
        path: "/api/user",
        handlers: [authGuard]
    }
];

// Request is the standard Web API for HTTP requests available in browsers and Node.js, while NextRequest is a Next.js-specific subclass of Request used in Middleware and App Router (route.ts). NextRequest extends Request by adding built-in convenience methods for easier access to cookies, IP addresses, and URL parsing (nextUrl). 
export async function proxy(request: NextRequest) {
    const url = request.nextUrl.pathname;

    for (const route of protectedRoutes) {
        if (url.startsWith(route.path)) {
            console.log("Middleware ran for: ", url);
            for (const handler of route.handlers) {
                try {
                    const result = await handler(request);

                    // If handler returns NextResponse, stop and return it
                    if (result instanceof NextResponse) {
                        return result;
                    }

                    // no result = continue
                } catch (error) {
                    return NextResponse.json(
                        {
                            success: false,
                            error: String(error)
                        },
                        { status: 500 }
                    )
                }
            }
        }
    }

    // If nothing matched, continue to the route handler
    return NextResponse.next();
}
