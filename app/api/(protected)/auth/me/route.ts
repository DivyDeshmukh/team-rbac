import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { getCurrentUser } from "@/lib/utils/auth.utils";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async (req: Request) => {
    const user = await getCurrentUser();

    return NextResponse.json(
        {
            success: true,
            user
        },
        { status: 200 }
    );
});
