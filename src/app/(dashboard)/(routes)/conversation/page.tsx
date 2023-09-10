'use client';

import AIAvatar from "@/components/AIAvatar";
import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Placeholder from "@/components/Placeholder";
import UserAvatar from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import toast from "react-hot-toast";

const ConversationToolPage = () => {

    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
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

        try {
            // new message from user
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: data.prompt
            }

            // ALL THE PREVIOUS MESSAGES AND NEW MESSAGE
            const newMessages: ChatCompletionRequestMessage[] = [...messages, userMessage];

            // MAKING API REQUEST TO CHAT WITH MODEL
            const response = await axios
                .post('/api/conversation', {
                    messages: newMessages
                });

            // UPDATE MESSAGES HISTORY
            setMessages(currentMessages => [...currentMessages, userMessage, response.data])

            // RESET FORM VALUES
            form.reset();

        } catch (error: any) {

            //  OPEN UpgerdeToProModalPro
            if (error?.response?.status === 403) {


                upgradeToProModal.onOpen();
            } else {

                toast.error("Something went wrong!");
            }

        } finally {

            // rehydrate all server components and serve them with new fetched data, updated data
            router.refresh();

        }

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
                                                placeholder="How deep is the ocean?"
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
                        messages.length === 0 && !isLoading && (
                            <Placeholder label="Start typing to chat with Uaiser AI" />
                        )

                    }
                    <div className="flex flex-col-reverse gap-y-4" >
                        {
                            messages.map(
                                message => (
                                    <div
                                        key={message.content}
                                        className={cn(
                                            "p-8 w-full flex items-end gap-x-8 rounded-lg",
                                            message.role === 'user' ? 'bg-white border border-black/10' : 'bg-muted'
                                        )}
                                    >
                                        {message.role === 'user' ? <UserAvatar /> : <AIAvatar />}

                                        <span className="text-sm" >
                                            {message.content}
                                        </span>

                                    </div>
                                )
                            )
                        }
                    </div>
                </article>
            </article>
        </section>
    )
}

export default ConversationToolPage;