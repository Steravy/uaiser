import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React, { Fragment } from "react";

interface IHeadingProps {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColor?: string;
    bgColor?: string;
}

const Heading: React.FC<IHeadingProps> = ({ title, description, icon: Icon, iconColor, bgColor }) => {

    return (

        <header className="flex items-center gap-x-3 px-4 lg:px-8 mb-8 " >
            <article className={cn("p-2 w-fit rounded-md", bgColor)} >
                <Icon className={cn("w-10 h-10", iconColor)} />
            </article>
            <article>
                <h2 className="text-3xl font-bold" >
                    {title}
                </h2>
                <p className="text-sm text-muted-foreground" >
                    {description}
                </p>
            </article>
        </header>
    )
}

export default Heading;