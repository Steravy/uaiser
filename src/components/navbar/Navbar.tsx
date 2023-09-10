
import getUserApiUsageLimitCount from "@/providers/get-api-usage-limit-count";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../MobileSideBar";
import { isUserSubscribed } from "@/providers/subscription-details";


const Navbar = async () => {

    const userApiUsageLimitCount = await getUserApiUsageLimitCount();
    const isProMember = await isUserSubscribed();

    return (

        <header className="flex items-center p-4" >

            <MobileSideBar userApiUsageLimitCount={userApiUsageLimitCount} isProMember={isProMember} />

            <article className="flex w-full justify-end" >
                <UserButton afterSignOutUrl="/" />
            </article>

        </header>
    )
}

export default Navbar;