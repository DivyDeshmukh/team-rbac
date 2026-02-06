import { Team, User } from "../types";

export function transformUser(user: any): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    team: user.team || undefined,
    teamId: user.teamId ?? null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export function transformUsers(users: any[]): User[] {
    return users.map(transformUser);
}

export function transformTeam(team: any): Team {
    return {
        id: team.id,
        name: team.name,
        description: team.description || undefined,
        code: team.code,
        members: team.members || [],
        createdAt: team.createdAt,
        updatedAt: team.updatedAt
    }
};

export function transformTeams(teams: any[]): Team[] {
    return teams.map(transformTeam);
}
