'use client';


import Link from "next/link";
import Typer from "./Typer";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";


type Props = {}

const HeroSection = (props: Props) => {

    const { isSignedIn } = useAuth();


    return (

        <section className="max-w-4xl lg:max-w-6xl overflow-x-hidden space-y-6 lg:space-y-14 mx-auto flex flex-col md:flex-row items-center md:justify-between gap-x-6 p-4 px-5 lg:px-10  text-white">

            <article className="text-center md:text-start flex flex-col justify-center">

                <h3 className="text-2xl md:text-3xl text-white/50 font-normal mb-4 hover:text-white/75 transition" >
                    Uaiser
                </h3>

                <div className="text-4xl md:text-6xl text-white font-semibold m-0">
                    <p className="m-0 leading-none" >
                        The best AI <br /> tool for:
                    </p>
                </div>

                <Typer />

                <p className="mt-4 md:mt-8 text-lg font-normal leading-7 text-white/90">
                    {/* Set up an event page, invite friends and <br /> sell tickets. Host a memorable event <br /> today. */}
                    Guiding one`s journey to full potention!
                </p>

                <div className="mt-4 md:mt-8 flex items-center justify-center md:justify-start gap-x-2">
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >
                        <Button variant="outline" className="rounded-lg text-lg text-black" >
                            Start Generating for free
                        </Button>
                    </Link>
                </div>

            </article>

            <article className=" ">
                <figure className="w-[500px] lg:w-[600px] h-[500px] lg:h-[600px] relative mt-6 md:mt-0 md:-mr-8 lg:mr-0" >
                    <Image
                        priority
                        src={"/images/ai_hero.avif"}
                        fill
                        alt="AI Image"
                        className="rounded-full shadow-lg"
                    />
                </figure>
            </article>

        </section>
    )
}

export default HeroSection;