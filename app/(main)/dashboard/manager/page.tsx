import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils"
import { Role, User } from "@/lib/shared/types";
import { redirect } from "next/navigation";
import { prisma } from '../../../../lib/server/db/client';
import { transformUsers } from "@/lib/shared/utils/transformData";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

const ManagerPage = async ({
    searchParams
}: {
    searchParams: Promise<{ page?: string; limit?: string }>;
}) => {

    const { page: pageStr, limit: limitStr } = await searchParams;
    const page = Math.max(1, parseInt(pageStr || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(limitStr || "10")));

    const user = await getCurrentUser();
    
    if (!user || !checkUserPermission(user, Role.MANAGER)) {
        redirect("/unauthorized");
    }

    // Fetch data for manager's own team members
    const prismaMyTeamMembers = user.teamId 
    ? await prisma.user.findMany({
        where: {
            teamId: user.teamId,
            role: { not: Role.ADMIN }
        },
        include: {
            team: true
        }
    }) 
    : [];

    // Fetch All team members (cross-team view - exclude sensitive fields)
    const [prismaAllTeamMembers, totalAllMembers] = await Promise.all([
        prisma.user.findMany({
            where: {
                role: { not: Role.ADMIN }
            },
            include: {
                team: {
                    select: {
                        id: true,
                        name: true,
                        code: true,
                        description: true
                    }
                }
            },
            orderBy: {
                teamId: "desc"
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        prisma.user.count({
            where: {
                role: { not: Role.ADMIN }
            }
        })
    ]);

    const totalPages = Math.ceil(totalAllMembers / limit);

    const pagination = {
        page,
        limit,
        totalItems: totalAllMembers,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    }

    const myTeamMembers = transformUsers(prismaMyTeamMembers);
    const allTeamMembers = transformUsers(prismaAllTeamMembers);

    return (
        <ManagerDashboard 
            myTeamMembers={myTeamMembers as User[]}
            allTeamMembers={allTeamMembers as User[]}
            currentUser={user}
            pagination={pagination}
        />
    );
}; 

export default ManagerPage;