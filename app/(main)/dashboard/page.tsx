import { getCurrentUser } from "@/lib/server/utils/auth.utils";
import { Role } from "@/lib/shared/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardLayout = async () => {
    const user = await getCurrentUser();
    
    if (!user) {
        redirect("/login");
    }

    // Redirect based on user role
    switch(user.role) {
        case Role.ADMIN:
            redirect("/dashboard/admin");
            break;

        case Role.MANAGER:
            redirect("/dashboard/manager");
            break;

        case Role.USER:
            redirect("/dashboard/user");
            break;
        default:
            redirect("/dashboard/user");
            break;
    }

};

export default DashboardLayout;