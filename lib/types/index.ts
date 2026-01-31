// enum exists during runtime like object similar to what we have in constant.ts and we can access it by importing
export enum Role {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    USER = "USER",
    GUEST = "GUEST"
}

// just for compile time type safety preferred over type as can be easily extended
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    teamId?: string;
    team?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Team {
    id: string;
    name: string;
    description?: string | null;
    code: string;
    memebers: User[];
    createdAt: Date;
    updatedAt: Date;
}
