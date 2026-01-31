import { authSchema } from "@/lib/schemas";
import { authService } from "@/lib/services";
import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { NextResponse } from "next/server";

const { loginSchema } = authSchema;
const { loginUser } = authService;

export const POST = asyncHandler(async(req: Request) => {
    const body = await req.json();

    const parsed = loginSchema.parse(body);

    const { user, token } = await loginUser(parsed);

    const response = NextResponse.json(
        {
            success: true,
            user
        },
        { status: 200 }
    );

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
    });

    return response;
});