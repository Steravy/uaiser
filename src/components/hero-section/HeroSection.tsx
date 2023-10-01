'use client';


import Link from "next/link";
import Typer from "./Typer";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";


type Props = {}

const HeroSection = (props: Props) => {

    const { isSignedIn } = useAuth();


    return (

        <section className="flex items-center justify-between gap-x-6 p-4 px-10 h-screen text-white">

            <article>

                <h3 className="text-3xl text-white/50 font-semibold tracking-wide mb-4" >
                    Uaiser
                </h3>

                <div className="text-[3.8rem] text-white font-semibold m-0">
                    <p className="m-0 leading-none" >
                        The best AI <br /> tool for:
                    </p>
                </div>

                <Typer />

                <p className="mt-8 text-lg font-normal leading-7 text-white/90">
                    Set up an event page, invite friends and <br /> sell tickets. Host a memorable event <br /> today.
                </p>

                <div className="mt-8 flex items-center gap-x-2">
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                        <Button variant="outline" className="rounded-lg text-lg text-black" >
                            Start Generating for free
                        </Button>
                    </Link>
                </div>

            </article>

            <article>
                right
            </article>

        </section>
    )
}

export default HeroSection;