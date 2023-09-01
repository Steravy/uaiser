
import getUserApiUsageLimitCount from "@/providers/get-api-usage-limit-count";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../MobileSideBar";


const Navbar = async () => {

    const userApiUsageLimitCount = await getUserApiUsageLimitCount();

    return (

        <header className="flex items-center p-4" >

            <MobileSideBar userApiUsageLimitCount={userApiUsageLimitCount} />

            <article className="flex w-full justify-end" >
                <UserButton afterSignOutUrl="/" />
            </article>

        </header>
    )
}

export default Navbar;