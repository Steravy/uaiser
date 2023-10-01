import HomePageHeroSection from "@/components/HomePageHeroSection";
import Testimonials from "@/components/Testimonials";
import HeroSection from "@/components/hero-section/HeroSection";
import HomePageNavbar from "@/components/navbar/HomePageNavbar";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
})


const LandingPage = () => {


    return (

        <section className={cn("h-screen", montserrat.className)} >

            <HomePageNavbar />
            {/* <HomePageHeroSection /> */}
            <HeroSection />
            {/* <Testimonials /> */}

        </section>
    )
}

export default LandingPage;