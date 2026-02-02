import z from "zod";
import { Role } from "../../server/generated/prisma/enums";

export const getUserSchema = z.object({
    teamId: z.string().optional(),
    role: z.enum([Role.USER, Role.MANAGER]).optional()
});

export type GetUserInput = z.infer<typeof getUserSchema>;

export const updateUserTeamSchema = z.object({
    teamId: z.string().nullable(),
    userId: z.string()
});

export type UpdateUserTeamInput = z.infer<typeof updateUserTeamSchema>;

export const updateUserRoleSchema = z.object({
    role: z.enum([Role.USER, Role.MANAGER]),
    userId: z.string()
});

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;