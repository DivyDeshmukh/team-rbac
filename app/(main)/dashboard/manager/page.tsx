import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils"
import { Role, User } from "@/lib/shared/types";
import { redirect } from "next/navigation";
import { prisma } from '../../../../lib/server/db/client';
import { transformUsers } from "@/lib/shared/utils/transformData";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

const ManagerPage = async () => {
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
    const prismaAllTeamMembers = await prisma.user.findMany({
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
        }
    });

    const myTeamMembers = transformUsers(prismaMyTeamMembers);
    const allTeamMembers = transformUsers(prismaAllTeamMembers);

    return (
        <ManagerDashboard 
            myTeamMembers={myTeamMembers as User[]}
            allTeamMembers={allTeamMembers as User[]}
            currentUser={user}
        />
    );
}; 

export default ManagerPage;