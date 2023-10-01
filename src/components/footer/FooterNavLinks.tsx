'use client';

import Link from "next/link";
import ClientWrapper from "../ClientWrapper";
import NavLink from "./NavLink";
import SocialLinks from "../SocialLinks";

type Props = {}

const FooterNavLinks = (props: Props) => {

    const footerLinks = [
        {
            label: "Pricing",
            href: "/pricing",
        },
        {
            label: "Help",
            href: "/help",
        },
        {
            label: "Privacy Police",
            href: "/privacy-policy",
        },
        {
            label: "Terms",
            href: "/terms",
        },
        {
            label: "Security",
            href: "/security",
        }
    ];

    const primaryLinks = footerLinks.slice(0, 2);
    const secondaryLinks = footerLinks.slice(2);

    return (

        <ClientWrapper>
            <section className="flex flex-col justify-between gap-y-3 md:gap-y-6" >
                <article className="flex items-center justify-between w-full" >
                    <article className="flex items-center gap-x-4" >
                        <Link href='/' >
                            <h3 className="text-lg text-white/75 font-semibold hover:text-white transition" >
                                Uaiser &copy;
                            </h3>
                        </Link>
                        {
                            primaryLinks.map(
                                (primaryLink, index) => (
                                    <NavLink label={primaryLink.label} href={primaryLink.href} key={index} />
                                )
                            )
                        }
                    </article>
                    <>
                        <SocialLinks />
                    </>
                </article>

                <article className="text-start">
                    {
                        secondaryLinks.map(
                            (secondaryLink, index) => (
                                <NavLink label={secondaryLink.label} href={secondaryLink.href} key={index} className="mr-4 text-sm text-white/40" />
                            )
                        )
                    }
                </article>
            </section>
        </ClientWrapper>

    )
}

export default FooterNavLinks;