// Import and re-export Role from Prisma as source of truth
import { Role } from '@/lib/server/generated/prisma/enums';
export { Role };

// just for compile time type safety preferred over type as can be easily extended
export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    teamId: string | null;
    team?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Team {
    id: string;
    name: string;
    description?: string | null;
    code: string;
    members: User[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AuthContextType {
    user: User | null,
    login: (formData: FormData) => void;
    logout: () => void;
    hasPermission: (requiredRole: Role) => boolean;
}
