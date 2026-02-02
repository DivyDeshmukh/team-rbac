
import { asyncHandler } from "@/lib/server/utils/asyncHandler.utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
    // Clear the token cookie by setting it to empty and expiring
    const response = NextResponse.json(
        {
            success: true,
            message: "Logged out successfully"
        },
        { status: 200 }
    );

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",        // cookie visible on all routes
        maxAge: 0         // expire immediately
    });

    return response;
});