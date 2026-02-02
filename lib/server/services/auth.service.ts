import { LoginInput, RegisterInput } from "../../shared/schemas/auth.schema";
import { prisma } from "../db/client";
import { ApiError } from "next/dist/server/api-utils";
import { generateJwtToken, hashPassword, verifyPassword } from "../utils/auth.utils";
import { Role } from "../generated/prisma/enums";

export async function registerUser(input: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
        where: { 
            email: input.email
        }
    });

    if (existingUser) {
        throw new ApiError(409, "A user with that email already exists");
    }

    let teamId: string | undefined;
    if (input.teamCode) {
        const team = await prisma.team.findUnique({
            where: {
                code: input.teamCode
            }
        });

        if (!team) {
            throw new ApiError(400, "Please enter a valid team code");
        }

        teamId = team.id;
    }

    const hashed = await hashPassword(input.password);

    // First user become ADMIN, others become USER
    const userCount = await prisma.user.count();
    const role = userCount === 0 ? Role.ADMIN : Role.USER;

    const createdUser = await prisma.user.create({
        data: {
            name: input.name,
            email: input.email,
            password: hashed,
            role,
            teamId
        },
        include: {
            team: true
        }
    });

    // Generate Token here and always handle token genertaion seperately for register and login
    const token = generateJwtToken(createdUser.id);

    const { password, ...rest } = createdUser;
    return {
        user: rest,
        token
    }
};

export async function loginUser(input: LoginInput) {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email
        }
    });

    if (!existingUser) {
        throw new ApiError(400, "Invalid Password or Email");
    }

    const isPasswordCorrect = await verifyPassword(input.password, existingUser.password);

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Password or Email");
    }

    const token = generateJwtToken(existingUser.id);

    const { password, ...rest } = existingUser;

    return {
        user: rest,
        token
    };
};
