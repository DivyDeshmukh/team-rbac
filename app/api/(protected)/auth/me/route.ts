import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { getCurrentUser } from "@/lib/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
    const user = await getCurrentUser();

    return NextResponse.json(
        {
            success: true,
            user
        },
        { status: 200 }
    );
});
