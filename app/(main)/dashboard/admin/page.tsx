import {
  checkUserPermission,
  getCurrentUser,
} from "@/lib/server/utils/auth.utils";
import { redirect } from "next/navigation";
import { prisma } from "../../../../lib/server/db/client";
import {
  transformTeams,
  transformUsers,
} from "@/lib/shared/utils/transformData";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { Role } from "@/lib/shared/types";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const { page: pageStr, limit: limitStr } = await searchParams;
  const page = Math.max(1, parseInt(pageStr || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(limitStr || "10")));
  const user = await getCurrentUser();

  if (!user || !checkUserPermission(user, Role.ADMIN)) {
    redirect("/unauthorized");
  }

  // Fetch data for admin dashboard
  const [prismaUsers, prismaTotalUsersCount, roleCounts, prismaTeams] = await Promise.all([
    prisma.user.findMany({
      include: {
        team: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.user.count(),
    prisma.user.groupBy({
        by: ["role"],
        _count: { role: true }
    }),
    prisma.team.findMany({
      include: {
        members: {
          select: {
            id: true,
            name: true,
            role: true,
            email: true,
          },
        },
      },
    }),
  ]);

  const totalPages = Math.ceil(prismaTotalUsersCount / limit);

  const pagination = {
    page,
    limit,
    totalItems: prismaTotalUsersCount,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };

  const stats = {
    totalUsers: prismaTotalUsersCount,
    admins: roleCounts.find(r => r.role === Role.ADMIN)?._count.role ?? 0,
    managers: roleCounts.find(r => r.role === Role.MANAGER)?._count.role ?? 0,
    users: roleCounts.find(r => r.role === Role.USER)?._count.role ?? 0,
    totalTeams: prismaTeams.length
  }

  const users = transformUsers(prismaUsers);
  const teams = transformTeams(prismaTeams);

  return <AdminDashboard users={users} teams={teams} currentUser={user} pagination={pagination} stats={stats} />;
};

export default AdminPage;
