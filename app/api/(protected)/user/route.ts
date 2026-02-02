import { userSchema } from "@/lib/schemas";
import { userService } from "@/lib/services";
import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { getCurrentUser } from "@/lib/utils/auth.utils";
import { NextRequest, NextResponse } from "next/server";

const { getUserSchema } = userSchema;

const { getUser } = userService;

export const GET = asyncHandler(async (req: NextRequest) => {
    // get and validate query params
    const query = req.nextUrl.searchParams;

    // URLSearchParams is not a plain object — Zod doesn't know how to extract properties from it, so teamId and role will both be undefined after parsing, and the filter is never applied.
    const parsed = getUserSchema.parse(Object.fromEntries(query));

    const { teamId, role } = parsed;

    const currentUser = await getCurrentUser(req);

    const users = await getUser({ teamId, role }, currentUser!);

    return NextResponse.json(
        {
            success: true,
            users
        },
        { status: 200 }
    );
});