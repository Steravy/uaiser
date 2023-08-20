'use client';

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ApiUsageLimitCountDisplayer from "@/components/ApiUsageLimitCountDisplayer";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

interface SidebarProps {
    userApiUsageLimitCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ userApiUsageLimitCount }) => {

    const pathname = usePathname();

    return (

        <article className="h-full flex flex-col space-y-4 py-4 bg-[#111827] text-white ">
            <article className="flex-1 px-3 py-2" >
                <Link href={"/dashboard"} className="flex items-center pl-3 mb-14" >
                    <figure className="relative w-8 h-8 mr-4" >
                        <Image
                            alt="Uaiser Logo"
                            src={"/images/logo.png"}
                            fill
                        />
                    </figure>
                    <div className={cn("text-2xl font-bold", montserrat.className)} >
                        Uaiser
                    </div>
                </Link>
                <div className="space-y-1 " >
                    {
                        navLinks.map(
                            link => (
                                <Link
                                    href={link.href}
                                    key={link.href}
                                    className={cn("flex justify-start w-full p-3 text-sm font-medium group cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                        pathname === link.href ? " text-white bg-white/10" : "text-zinc-400"
                                    )}
                                >
                                    <span className="flex flex-1 items-center" >
                                        <link.icon className={cn("h-5 w-5 mr-3", link.color)} />
                                        {link.label}
                                    </span>
                                </Link>
                            )
                        )
                    }
                </div>
            </article>
            <ApiUsageLimitCountDisplayer userApiUsageLimitCount={userApiUsageLimitCount} />
        </article>
    )
}

export default Sidebar;