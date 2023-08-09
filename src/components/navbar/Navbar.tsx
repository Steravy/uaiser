import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';


const Navbar = () => {

    return (

        <header className="flex items-center p-4" >
            <Button variant="ghost" size="icon" className="md:hidden" >
                <Menu />
            </Button>
        </header>
    )
}

export default Navbar;