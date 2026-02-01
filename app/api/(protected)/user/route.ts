import { userSchema } from "@/lib/schemas";
import { userService } from "@/lib/services";
import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { NextRequest, NextResponse } from "next/server";

const { getUserSchema } = userSchema;

const { getUser } = userService;

export const GET = asyncHandler(async (req: NextRequest) => {
    // get and validate query params
    const query = req.nextUrl.searchParams;

    const parsed = getUserSchema.parse(query);

    const { teamId, role } = parsed;

    const users = await getUser({ teamId, role });

    return NextResponse.json(
        {
            success: true,
            users
        },
        { status: 200 }
    );
});