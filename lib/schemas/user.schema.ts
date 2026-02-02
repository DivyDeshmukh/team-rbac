import z from "zod";

export const getUserSchema = z.object({
    teamId: z.string().optional(),
    role: z.string().optional()
});

export type GetUserInput = z.infer<typeof getUserSchema>;

export const updateUserTeamSchema = z.object({
    teamId: z.string().nullable(),
    userId: z.string()
});

export type UpdateUserTeamInput = z.infer<typeof updateUserTeamSchema>;