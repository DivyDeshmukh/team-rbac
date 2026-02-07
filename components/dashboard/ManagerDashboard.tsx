import { getCurrentUser } from "@/lib/server/utils/auth.utils";
import { PaginationMeta, User } from "@/lib/shared/types";
import Pagination from "../layout/Pagination";

interface ManagerDashboardProps {
    myTeamMembers: User[];
    allTeamMembers: User[];
    currentUser: User;
    pagination: PaginationMeta;
}

export default async function ManagerDashboard ({myTeamMembers, allTeamMembers, currentUser, pagination}: ManagerDashboardProps) {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold mb-2 text-white">Manager Dashboard</h1>
                <p className="text-slate-300">Team Management View</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Team Members */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="p-4 border-b border-slate-700">
                        <h3 className="font-semibold text-white">
                            Team Members ({pagination.totalItems})
                        </h3>
                    </div>

                    <div className="p-4">
                        {
                            allTeamMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="border-b border-slate-700 py-2 last:border-b-0"
                                >
                                    <p className="font-medium text-white">{member.name}</p>
                                    <p className="text-sm text-slate-400">
                                        {member.email} * {member.role} * {member.team}
                                    </p>
                                </div>
                            ))
                        }
                    </div>

                    <Pagination 
                        page={pagination.page}
                        limit={pagination.limit}
                        totalPages={pagination.totalPages}
                        totalItems={pagination.totalItems}
                        hasNextPage={pagination.hasNextPage}
                        hasPrevPage={pagination.hasPrevPage}
                    />
                </div>

                {/* My Team Members */}
                <div className="bg-slate-800 border border-slate-700 rounded-lg">
                    <div className="p-4 border-b border-slate-700">
                        <h3 className="font-semibold text-white">
                            My Team ({myTeamMembers.length})
                        </h3>
                    </div>

                    <div className="p-4">
                        {
                            myTeamMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className="border-b border-slate-700 py-2 last:border-b-0"
                                >
                                    <p className="font-medium text-white">{member.name}</p>
                                    <p className="text-sm text-slate-400">
                                        {member.email} * {member.role} * {member.team}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
