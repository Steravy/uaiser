'use client';

import { Card } from "@/components/ui/card";
import { tools } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export default function DashboardPage() {

    const router = useRouter();


    return (

        <section className="">

            <article className="mb-8 space-y-4" >
                <h2 className="text-2xl md:text-4xl font-bold text-center " >
                    {/* Unleash the power of AI */}
                    Unleash your power with AI
                </h2>
                <p className="text-muted-foreground font-light text-sm md:text-lg text-center px-4" >
                    {/* Unlocking One's Full Potential: Your Journey to Transformation Starts with Uaiser */}
                    Uaiser AI: Guiding One`s Journey to Full Potential
                </p>
            </article>

            <article className="px-4 md:px-20 lg:px-32 space-y-4 " >
                {
                    tools.map(
                        tool => (
                            <Card
                                onClick={() => router.push(tool.href)}
                                key={tool.href}
                                className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer "
                            >
                                <article className="flex items-center gap-x-4" >
                                    <article className={cn("p-2 w-fit rounded-md", tool.bgColor)} >
                                        <tool.icon className={cn("h-7 w-7", tool.color)} />
                                    </article>
                                    <p className="font-semibold" >
                                        {tool.label}
                                    </p>
                                </article>

                                <ArrowRight className="w-5 h-5" />
                            </Card>
                        )
                    )
                }
            </article>
        </section>
    )
}