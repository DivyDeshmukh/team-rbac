import { NextRequest, NextResponse } from "next/server";
import {
    authMiddleware
} from "../../../lib/middlewares"

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
        path: "/api/auth/users",
        handlers: [authGuard]
    }
];

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;

    for (const route of protectedRoutes) {
        if (url.startsWith(route.path)) {
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