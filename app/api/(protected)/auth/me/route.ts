import { asyncHandler } from "@/lib/server/utils/asyncHandler.utils";
import { getCurrentUser } from "@/lib/server/utils/auth.utils";
import { ApiError } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export const GET = asyncHandler(async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }

    return NextResponse.json(
        {
            success: true,
            user
        },
        { status: 200 }
    );
});
