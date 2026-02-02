import { Role } from "@/lib/server/generated/prisma/enums";
import { userSchema } from "@/lib/shared/schemas";
import { userService } from "@/lib/server/services";
import { asyncHandler } from "@/lib/server/utils/asyncHandler.utils";
import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

const { updateUserRoleSchema } = userSchema;
const { updateUserRole } = userService;

export const PATCH = asyncHandler(
  async (
    req: NextRequest,
    context: { params: Promise<{ userId: string }> },
  ) => {
    const { userId } = await context.params;

    const user = await getCurrentUser(req);

    const body = await req.json();

    const parsed = updateUserRoleSchema.parse({ userId, ...body });

    if (!user || !checkUserPermission(user, Role.ADMIN)) {
      throw new ApiError(403, "You are not authorized to update team");
    }

    if (user.id === userId) {
      throw new ApiError(403, "You cannot change your own role");
    }

    const { message, ...updatedUser } = await updateUserRole(parsed);

    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
        message,
      },
      { status: 200 },
    );
  },
);
