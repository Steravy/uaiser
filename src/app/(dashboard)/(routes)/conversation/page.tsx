'use client';

import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";

const ConversationToolPage = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
    };


    return (

        <section>
            <Heading
                title='Uaiser Chat'
                description="The most advanced Chat AI available"
                icon={MessageSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <article className="px-4 lg:px-8" >

            </article>
        </section>
    )
}

export default ConversationToolPage