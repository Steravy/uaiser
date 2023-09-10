import HomePageHeroSection from "@/components/HomePageHeroSection";
import Testimonials from "@/components/Testimonials";
import HomePageNavbar from "@/components/navbar/HomePageNavbar";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
})


const LandingPage = () => {


    return (

        <section className={cn("h-full", montserrat.className)} >

            <HomePageNavbar />
            <HomePageHeroSection />
            <Testimonials />

        </section>
    )
}

export default LandingPage;