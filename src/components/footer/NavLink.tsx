'use client';

import { cn } from "@/lib/utils";
import Link from "next/link"
import { Fragment } from "react"

type Props = {
    label: string,
    href: string,
    className?: string
}

const NavLink: React.FC<Props> = ({ label, href, className }: Props) => {

    return (

        <Fragment>
            <Link href={href} className={cn("text-white/75 text-sm font-normal hover:text-white/75 transition", className)} >
                {label}
            </Link>
        </Fragment>
    )
}

export default NavLink;