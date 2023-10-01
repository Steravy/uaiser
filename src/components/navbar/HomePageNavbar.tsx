"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: "600"
})


type Props = {}

const HomePageNavbar = (props: Props) => {

    const { isSignedIn } = useAuth();

    return (

        <header className="flex items-center w-full justify-center">
            <nav className="max-w-[1700px] p-4 bg-transparent flex items-center justify-between w-full">

                <Link href={"/"} className="flex items-center" >
                    <figure className="relative w-8 h-8 mr-4" >
                        <Image
                            alt="Uaiser Logo"
                            src={"/images/logoII.svg"}
                            fill
                            priority
                            className="grayscale hover:animate-spin hover:grayscale-0"
                        />
                    </figure>
                    <h1 className={cn("text-2xl font-bold text-white", montserrat.className)} >
                        {/* Uaiser */}
                    </h1>
                </Link>

                <div className="flex items-center gap-x-2">
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                        <Button variant="outline" className="rounded-full" >
                            Get Started
                        </Button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default HomePageNavbar;