'use client';

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";

const ConversationToolPage = () => {

    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
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
            //  OPEN PRO MODEL
            console.log(error)
        } finally {

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
                    <div className="flex flex-col-reverse gap-y-4" >
                        {
                            messages.map(
                                message => (
                                    <p key={message.content} >
                                        {message.content}
                                    </p>
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