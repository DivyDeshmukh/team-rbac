import { getCurrentUser } from "@/lib/server/utils/auth.utils";
import { Team, User } from "@/lib/shared/types";

interface ManagerDashboardProps {
  myTeamMembers: User[];
  allTeamMembers: User[];
  currentUser: User;
}

export default async function ManagerDashboard ({myTeamMembers, allTeamMembers, currentUser}: ManagerDashboardProps) {

    const user = await getCurrentUser();

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
                            Team Members ({allTeamMembers.length})
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
                </div>

                {/* My Team Members */}
                <div></div>
            </div>
        </div>
    )
}