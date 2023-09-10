'use client';

import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Placeholder from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import toast from "react-hot-toast";

const VideoGenerationToolPage = () => {

    const [video, setVideo] = useState<string>();
    const router = useRouter();

    const upgradeToProModal = useUpgradeToProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("before axios")
        try {

            setVideo(undefined);

            console.log("before axios")
            // MAKING API REQUEST TO CHAT WITH MODEL
            const response = await axios
                .post('/api/video', data);

            setVideo(response.data[0])
            // RESET FORM VALUES

            console.log(JSON.stringify(response.data, null, 2));
            form.reset();

        } catch (error: any) {

            //  OPEN PRO MODEL
            if (error?.response?.status === 403) {

                upgradeToProModal.onOpen();
            } else {

                toast.error("Something went wrong!");
            }

        } finally {

            router.refresh();
        }

    };


    return (

        <section>
            <Heading
                title='Video Generator'
                description="Create live motions from your words."
                icon={Video}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
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
                                                placeholder="A wolf playing eletric guittar..."
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
                        !video && !isLoading && (
                            <Placeholder label="Waiting for you words to create the next big production" />
                        )

                    }
                    {
                        video && (
                            <video controls className="w-full mt-8 aspect-video rounded-lg border bg-black" >
                                <source src={video} />
                            </video>
                        )
                    }
                </article>
            </article>
        </section>
    )
}

export default VideoGenerationToolPage;