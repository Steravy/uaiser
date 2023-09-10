'use client';

import Heading from "@/components/Heading";
import Loader from "@/components/Loader";
import Placeholder from "@/components/Placeholder";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUpgradeToProModal } from "@/hooks/useUpgradeToProModal";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from 'axios';
import { Download, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import toast from "react-hot-toast";

const ImageGeneratorToolPage = () => {

    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const upgradeToProModal = useUpgradeToProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            resolution: '512x512',
            amount: '1'
        }
    })

    const isLoading = form.formState.isSubmitting;

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {

        try {

            setImages([])

            console.log(data)

            // MAKING API REQUEST TO CHAT WITH MODEL
            const response = await axios
                .post('/api/image', data);

            const urls = response.data.map((images: { url: string }) => images.url);

            setImages(urls);

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
                title='Image Generator'
                description="Paint pictures with your words."
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-6" >
                                        <FormControl className="p-0 m-0" >
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent px-2"
                                                disabled={isLoading}
                                                placeholder="A pitcure of a CLI app that generates README files"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                }
                            />

                            <FormField
                                control={form.control}
                                name={'amount'}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2" >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    amountOptions.map(option => (
                                                        <SelectItem key={option.value} value={option.value} >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={'resolution'}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2" >
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    resolutionOptions.map(option => (
                                                        <SelectItem key={option.value} value={option.value} >
                                                            {option.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
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
                            <article className="p-20" >
                                <Loader />
                            </article>
                        )
                    }

                    {
                        images.length === 0 && !isLoading && (
                            <Placeholder label="Tell Uaiser what you him to generate!" />
                        )

                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 " >
                        {
                            images.map(image => (
                                <Card key={image} className="rounded-lg overflow-hidden">
                                    <div className="relative aspect-square" >
                                        <Image
                                            fill
                                            alt={'Generated Image'}
                                            src={image}
                                        />
                                    </div>
                                    <CardFooter className="p-2" >
                                        <Button onClick={() => window.open(image)} variant={'secondary'} className="w-full" >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </article>
            </article>
        </section>
    )
}

export default ImageGeneratorToolPage;