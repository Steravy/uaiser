import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import getUserApiUsageLimitCount from "@/providers/get-api-usage-limit-count";
import { isUserSubscribed } from "@/providers/subscription-details";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const userApiUsageLimitCount = await getUserApiUsageLimitCount();
    const isProMember = await isUserSubscribed();

    return (

        <section className="h-full relative" >

            <aside className="h-full md:w-72 hidden md:flex md:flex-col md:fixed md:inset-y-0 z-30 bg-gray-900" >
                <Sidebar userApiUsageLimitCount={userApiUsageLimitCount} isProMember={isProMember} />
            </aside>

            <main className="md:pl-72" >
                <Navbar />
                {children}
            </main>

        </section>
    )
}

export default DashboardLayout;