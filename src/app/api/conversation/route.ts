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
        const { messages } = body;

        // VALIDATION

        if (!userId)
            return new NextResponse("Missing user credentials", { status: 401, statusText: "UNAUTHORIZED" });

        if (!openAiConfigurarion.apiKey)
            return new NextResponse("Missing OpenAI API Key configuration ", { status: 500, statusText: "INTERNAL SERVER ERROR" });

        if (!messages)
            return new NextResponse("Messages are Required", { status: 400, statusText: "NOT FOUND" });

        // REQUEST TO OPENAI
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        })

        // RETURN RESPONSE FROM OPENAI AI  MODEL
        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {

        console.log("[OPENAI_API_ERROR]", error);
        return new NextResponse("OPENAI_API_ERROR", { status: 500, statusText: "INTERNAL SERVER ERROR" });
    }

}