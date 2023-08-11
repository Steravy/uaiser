import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const openAiConfigurarion = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAiConfigurarion);

export async function POST(request: NextRequest) {

    try {

        const { userId } = auth();
        const body = await request.json();
        const { prompt, amount = 1, resolution = '512x512' } = body;

        // VALIDATION

        if (!userId)
            return new NextResponse("Missing user credentials", { status: 401, statusText: "UNAUTHORIZED" });

        if (!openAiConfigurarion.apiKey)
            return new NextResponse("Missing OpenAI API Key configuration ", { status: 500, statusText: "INTERNAL SERVER ERROR" });

        if (!prompt)
            return new NextResponse("Prompt are Required", { status: 400, statusText: "NOT FOUND" });

        if (!amount)
            return new NextResponse("Amount are Required", { status: 400, statusText: "NOT FOUND" });

        if (!resolution)
            return new NextResponse("Resolution are Required", { status: 400, statusText: "NOT FOUND" });

        // REQUEST TO OPENAI
        const response = await openai.createImage({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        })

        // RETURN RESPONSE FROM OPENAI AI  MODEL
        return NextResponse.json(response.data.data);

    } catch (error) {

        console.log("[IMAGE_GENERATION_ERROR]", error);
        return new NextResponse("Failed to generate image!", { status: 500, statusText: "INTERNAL SERVER ERROR" });
    }

}
