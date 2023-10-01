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
import { Code } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import * as z from "zod";
import { formSchema } from "./constants";
import toast from "react-hot-toast";

const CodeToolPage = () => {

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
                .post('/api/code', {
                    messages: newMessages
                });

            // UPDATE MESSAGES HISTORY
            setMessages(currentMessages => [...currentMessages, userMessage, response.data])

            // RESET FORM VALUES
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
                title='Code Generator'
                description="Generate code using descriptive text."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                                placeholder="Simple contact form using react and formik..."
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

                                        {/* <span className="text-sm" >
                                            {message.content}
                                        </span> */}

                                        <ReactMarkdown
                                            components={{
                                                pre: ({ node, ...props }) => (
                                                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg" >
                                                        <pre {...props} />
                                                    </div>
                                                ),

                                                code: ({ node, ...props }) => (
                                                    <code className="bg-black/10 p-1 rounded-lg" {...props} />
                                                )
                                            }}

                                            className="text-sm overflow-hidden leading-7"
                                        >
                                            {message.content || ''}
                                        </ReactMarkdown>

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

export default CodeToolPage;