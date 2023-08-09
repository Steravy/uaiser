import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../MobileSideBar";


const Navbar = () => {

    return (

        <header className="flex items-center p-4" >

            <MobileSideBar />

            <article className="flex w-full justify-end" >
                <UserButton afterSignOutUrl="/" />
            </article>

        </header>
    )
}

export default Navbar;