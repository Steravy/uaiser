
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import FooterNavLinks from "./FooterNavLinks";
import { useEffect, useState } from "react";
import ClientWrapper from "../ClientWrapper";

type Props = {}

const Footer = (props: Props) => {

    return (

        <footer className="max-w-4xl lg:max-w-6xl mx-auto px-5 md:px-10 mt-0 md:mt-20">
            <Separator className="my-5 bg-white/20" />
            
            <FooterNavLinks />

        </footer>

    )
}

export default Footer;