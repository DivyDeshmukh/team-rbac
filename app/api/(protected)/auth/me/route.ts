import { asyncHandler } from "@/lib/server/utils/asyncHandler.utils";
import { getCurrentUser } from "@/lib/server/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(async (req: NextRequest) => {
    const user = await getCurrentUser(req);

    return NextResponse.json(
        {
            success: true,
            user
        },
        { status: 200 }
    );
});
