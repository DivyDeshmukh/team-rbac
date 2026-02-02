import { GetUserInput, UpdateUserTeamInput } from "../schemas/user.schema";
import { getCurrentUser } from "@/lib/utils/auth.utils";
import { prisma } from "../db/client";
import { Role } from "@/lib/generated/prisma/client";
import { ApiError } from "next/dist/server/api-utils";

export async function getUser(input: GetUserInput) {
  const { teamId: filterTeam, role: filterRole } = input;

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  const {
    id: userId,
    role: requestRole,
    teamId: requesterTeam,
  } = currentUser;

  /*
            Build Prisma where object based on role rules:
            ADMIN:
            can see everyone
            MANAGER:
            same team always
            OR other teams but exclude managers
            USER:
            only same team
            GUEST:
            same team
        */

  let where: any = {};

  if (requestRole === Role.ADMIN) {
    // no additional restricted conditions
  } else if (requestRole === Role.MANAGER) {
    where = {
      OR: [
        { teamId: requesterTeam },
        {
          AND: [
            { teamId: { not: requesterTeam } },
            { role: { not: Role.MANAGER } },
            { role: { not: Role.ADMIN } },
          ],
        },
      ],
    };
  } else {
    // USER and GUEST
    if (requesterTeam) {
        where = {
            teamId: requesterTeam,     // only same team
            role: { not: Role.ADMIN }, // do not include admin
        };
    } else {
        // no team → only self
        where = {
            id: userId,
        };
    }
  }

  // apply additional filters
  if (filterTeam) {
    where.teamId = filterTeam;
  }

  if (filterRole) {
    where.role = filterRole;
  }

  // Now query with prisma
  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      teamId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

export async function updateUserTeam(input: UpdateUserTeamInput) {
  const { teamId, userId } = input;

  if (teamId) {
    const team = await prisma.team.findUnique({
      where: { id: teamId }
    });

    if (!team) {
      throw new ApiError(404, "Team not found");
    }
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      teamId: teamId ?? null
    },
    include: {
      team: true
    }
  });

  return {
    ...updatedUser,
    message: teamId ? "User assigned to team successfully" : "User removed from team successfully"
  };
};
