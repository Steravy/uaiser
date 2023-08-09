import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Menu } from 'lucide-react';


const Navbar = () => {

    return (

        <header className="flex items-center p-4 justify-end " >

            <Button variant="ghost" size="icon" className="md:hidden" >
                <Menu size={30} />
            </Button>

            <article className="flex w-full justify-end" >
                <UserButton afterSignOutUrl="/" />
            </article>

        </header>
    )
}

export default Navbar;