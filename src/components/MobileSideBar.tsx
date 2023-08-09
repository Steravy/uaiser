'use client';

import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from '@/components/Sidebar';
import ClientWrapper from './ClientWrapper';

const MobileSideBar = () => {

    return (

        <article>
            <ClientWrapper>
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="md:hidden" >
                            <Menu size={30} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className='p-0' >
                        <Sidebar />
                    </SheetContent>
                </Sheet>
            </ClientWrapper>
        </article>
    )
}

export default MobileSideBar;