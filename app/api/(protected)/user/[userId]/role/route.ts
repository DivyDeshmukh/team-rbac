import { Role } from "@/lib/generated/prisma/enums";
import { userSchema } from "@/lib/schemas";
import { userService } from "@/lib/services";
import { asyncHandler } from "@/lib/utils/asyncHandler.utils";
import { checkUserPermission, getCurrentUser } from "@/lib/utils/auth.utils";
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

    const user = await getCurrentUser();

    const body = await req.json();

    const parsed = updateUserRoleSchema.parse({ userId, ...body });

    if (!user || !checkUserPermission(user, Role.ADMIN)) {
      throw new ApiError(401, "You are not authorized to update team");
    }

    if (user.id === userId) {
      throw new ApiError(401, "You cannot change your own role");
    }

    const { message, ...updatedUser } = await updateUserRole(parsed);

    return NextResponse.json(
      {
        success: true,
        user: updatedUser,
        message,
      },
      { status: 201 },
    );
  },
);
