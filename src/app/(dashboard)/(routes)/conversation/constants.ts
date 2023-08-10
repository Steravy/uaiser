import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: 'You cannot send an empty message to chat with Uaiser!'
    })
})