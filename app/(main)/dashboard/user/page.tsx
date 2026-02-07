import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils"
import { Role, User } from "@/lib/shared/types";
import { redirect } from "next/navigation";
import { prisma } from '../../../../lib/server/db/client';
import UserDashboard from "@/components/dashboard/userDashboard";

const UserPage = async () => {
    const user = await getCurrentUser();
    if (!user || !checkUserPermission(user, Role.USER)) {
        redirect("/unauthorized");
    }

    // Fetch user-specific data
    const teamMembers = user.teamId 
    ? await prisma.user.findMany({
        where: {
            teamId: user.teamId
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    }) 
    : [];

    return (
        <UserDashboard 
            teamMembers={teamMembers as User[]}
            currentUser={user}
        />
    );
}; 

export default UserPage;