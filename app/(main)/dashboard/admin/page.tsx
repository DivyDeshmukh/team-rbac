import { checkUserPermission, getCurrentUser } from "@/lib/server/utils/auth.utils"
import { redirect } from "next/navigation";
import { prisma } from '../../../../lib/server/db/client';
import { transformTeams, transformUsers } from "@/lib/shared/utils/transformData";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Role } from "@/lib/shared/types";

const AdminPage = async () => {
    const user = await getCurrentUser();
    if (!user || !checkUserPermission(user, Role.ADMIN)) {
        redirect("/unauthorized");
    }

    // Fetch data for admin dashboard
    const [prismaUsers, prismaTeams] = await Promise.all([
        prisma.user.findMany({
            include: {
                team: true,
            },
            orderBy: {
                createdAt: "desc"
            }
        }),
        prisma.team.findMany({
            include: {
                members: {
                    select: {
                        id: true,
                        name: true,
                        role: true,
                        email: true
                    },
                },
            },
        }),
    ]);

    const users = transformUsers(prismaUsers);
    const teams = transformTeams(prismaTeams);

    return (
        <AdminDashboard 
            users={users}
            teams={teams}
            currentUser={user}
        />
    );
}; 

export default AdminPage;