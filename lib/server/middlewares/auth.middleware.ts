import { NextRequest, NextResponse } from "next/server";
import { verifyJwtToken } from "../utils/auth.utils";

// you get a NextRequest, not a plain Request because middleware runs in the Next.js Edge environment, and Next.js passes NextRequest to middleware — it has extra methods (like .cookies) that a plain Request doesn’t have.
export async function authGuard(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    // middlewares should never return success response only error response to reject the request
    if (!token) {
        return NextResponse.json(
            {
                success: false,
                error: "Authentication Failed"
            },
            { status: 401 }
        )
    }

    // decode token and verify
    try {
        const decoded = verifyJwtToken(token);

        // attach user info for other guards
        req.headers.set("x-user-id", decoded.userId);

        // no response means continue
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: "Invalid or expired token"
            },
            { status: 401 }
        );
    }
}