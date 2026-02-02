import { authSchema } from "@/lib/shared/schemas";
import { authService } from "@/lib/server/services";
import { asyncHandler } from "@/lib/server/utils/asyncHandler.utils";
import { NextRequest, NextResponse } from "next/server";

/*
POST here is just a variable that references a function, not some special language keyword.
How Errors Are Returned:- If error happens anywhere, will asyncHandler catch it and return proper response?
Your asyncHandler already handles:
ApiError (like “email taken”)
Zod error (registerSchema.parse fails)
Prisma errors (unique constraint)
Unexpected errors
*/

const { registerSchema } = authSchema;
const { registerUser } = authService;

export const POST = asyncHandler(async (req: NextRequest) => {
    const body =  await req.json();

    // validate
    const parsed = registerSchema.parse(body);    // parse returns clean, trusted data if everything is ok

    // run service and service can use infer type from registerSchema
    const { user, token } = await registerUser(parsed);

    // create response
    const response = NextResponse.json(
        {
            success: true,
            user
        },
        { status: 201 }
    );

    response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7
    });
    
    // asyncHandler only handles errors. If we reach here, everything went fine. 
    return response;
});
