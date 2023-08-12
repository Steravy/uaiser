'use client';

import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Placeholder from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

const MusicGenerationToolPage = () => {

    const [song, setSong] = useState<string>();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {

        try {

            setSong(undefined);

            // MAKING API REQUEST TO CHAT WITH MODEL
            const response = await axios
                .post('/api/music', data);

            setSong(response.data.audio)
            // RESET FORM VALUES
            form.reset();

        } catch (error: any) {
            //  OPEN PRO MODEL
            console.log(error)
        } finally {

            router.refresh();
        }

    };


    return (

        <section>
            <Heading
                title='Music Generator'
                description="Create symphonies from your words."
                icon={Music}
                iconColor="text-emerald-500"
                bgColor="bg-emerald-500/10"
            />
            <article className="px-4 lg:px-8" >
                <article>
                    <Form {...form} >
                        <form
                            onSubmit={form.handleSubmit(handleSubmit)}
                            className="grid grid-cols-12 gap-2 w-full p-4 px-3 md:px-6 border rounded-lg focus-within:shadow-sm "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) =>
                                    <FormItem className="col-span-12 lg:col-span-10" >
                                        <FormControl className="p-0 m-0" >
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2"
                                                disabled={isLoading}
                                                placeholder="Heavy metal guittar solo..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                }
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </article>
                <article className="space-y-4 mt-4" >

                    {
                        isLoading && (
                            <article className="w-full flex items-center justify-center p-8 rounded-lg bg-muted" >
                                <Loader />
                            </article>
                        )
                    }

                    {
                        !song && !isLoading && (
                            <Placeholder label="Tell Uaiser what do you want to hear!" />
                        )

                    }
                    {
                        song && (
                            <audio controls className="w-full mt-8" >
                                <source src={song} />
                            </audio>
                        )
                    }
                </article>
            </article>
        </section>
    )
}

export default MusicGenerationToolPage;