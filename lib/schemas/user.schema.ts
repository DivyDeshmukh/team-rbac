import z from "zod";

export const getUserSchema = z.object({
    teamId: z.string().optional(),
    role: z.string().optional()
});

export type GetUserInput = z.infer<typeof getUserSchema>;
