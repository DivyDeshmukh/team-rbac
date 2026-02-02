import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Email must be valid"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    teamCode: z.string().optional()
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;