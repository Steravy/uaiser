'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MobileSideBar = () => {

    return (

        <article>
            <Button variant="ghost" size="icon" className="md:hidden" >
                <Menu size={30} />
            </Button>
        </article>
    )
}

export default MobileSideBar