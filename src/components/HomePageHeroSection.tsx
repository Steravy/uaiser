'use client';

import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {}

const HomePageHeroSection = (props: Props) => {

    const { isSignedIn } = useAuth();

    return (

        <section className="text-white font-bold py-36 text-center space-y-5" >

            <article className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5" >

                <h1 className="" >
                    The Best AI Tool For
                </h1>

                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl" >
                    <TypewriterComponent
                        options={{
                            strings: [
                                "Chat.",
                                "Code Generation.",
                                "Image Generation.",
                                "Music Generation.",
                                "Video Generation.",
                            ],
                            autoStart: true,
                            loop: true
                        }}
                    />
                </h3>

            </article>

            <p className="text-sm md:text-xl font-light text-zinc-400">
                Create content 10x faster using AI
            </p>

            <article >
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"} >

                    <Button variant="premium" className="rounded-full md:text-lg p-4 md:p-6 font-semibold">
                        Start generating for free
                    </Button>

                </Link>
            </article>

            <p className="text-xs md:text-sm font-normal text-zinc-400" >
                No credit card required
            </p>

        </section>
    )
}

export default HomePageHeroSection;