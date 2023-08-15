import increaseUserApiUsageLimit from "@/service/increase-api-usage-limit";
import checkUserApiUsageLimit from "@/service/user-api-usage-limit";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const openAiConfigurarion = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(openAiConfigurarion);

const templateMessage: ChatCompletionRequestMessage = {
    role: 'system',
    content: 'You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.',
}

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

        //  CHECK USER API USAGE TO VERIFY IF SHOULD STILL USE THE APP WHILE IN FREE TRIAL
        const inFreeTrial = await checkUserApiUsageLimit();

        if (!inFreeTrial) {
            return new NextResponse("Your free trial has expired!", { status: 403, statusText: "FORBIDDEN" });
        }

        // REQUEST TO OPENAI
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [templateMessage, ...messages]
        })

        //  INCRESEASE USER API USAGE
        await increaseUserApiUsageLimit();

        // RETURN RESPONSE FROM OPENAI AI  MODEL
        return NextResponse.json(response.data.choices[0].message);

    } catch (error) {

        console.log("[CODE_ERROR]", error);
        return new NextResponse("OPENAI_API_ERROR", { status: 500, statusText: "INTERNAL SERVER ERROR" });
    }

}
