import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {

    return (

        <section className="flex items-center justify-center h-full gap-4" >

            <Link href="/sign-in">
                <Button>Login</Button>
            </Link>

            <Link href="/sign-up">
                <Button>Register</Button>
            </Link>


        </section>
    )
}

export default LandingPage;