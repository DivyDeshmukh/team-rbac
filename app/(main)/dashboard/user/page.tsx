import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils"
import { Role, User } from "@/lib/shared/types";
import { redirect } from "next/navigation";
import { prisma } from '../../../../lib/server/db/client';
import UserDashboard from "@/components/dashboard/userDashboard";

const UserPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; limit?: string; }>;
}) => {

    const { page: pageStr, limit: limitStr } = await searchParams;
    const page = Math.max(1, parseInt(pageStr || "1"));
    const limit = Math.min(50, Math.max(1, parseInt(limitStr || "10")));

    const user = await getCurrentUser();
    if (!user || !checkUserPermission(user, Role.USER)) {
        redirect("/unauthorized");
    }

    // Fetch user-specific data
    const [teamMembers, totalMembers] = user.teamId 
    ?  await Promise.all([
        prisma.user.findMany({
            where: {
                teamId: user.teamId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            },
            skip: (page - 1) * limit,
            take: limit
        }), 
        prisma.user.count({
            where: {
                teamId: user.teamId
            }
        }),
    ])
    : [[], 0];

    const totalPages = Math.ceil(totalMembers / limit);

    const pagination = {
        page,
        limit,
        totalItems: totalMembers,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
    };

    return (
        <UserDashboard 
            teamMembers={teamMembers as User[]}
            currentUser={user}
            pagination={pagination}
        />
    );
}; 

export default UserPage;