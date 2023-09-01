import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate';
import increaseUserApiUsageLimit from "@/providers/increase-api-usage-limit";
import checkUserApiUsageLimit from "@/providers/user-api-usage-limit";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || ''
})

export async function POST(request: NextRequest) {

    try {

        const { userId } = auth();
        const body = await request.json();
        const { prompt } = body;

        // VALIDATION

        if (!userId)
            return new NextResponse("Missing user credentials", { status: 401, statusText: "UNAUTHORIZED" });

        if (!prompt)
            return new NextResponse("Prompt are Required", { status: 400, statusText: "NOT FOUND" });

        //  CHECK USER API USAGE TO VERIFY IF SHOULD STILL USE THE APP WHILE IN FREE TRIAL
        const inFreeTrial = await checkUserApiUsageLimit();

        if (!inFreeTrial) {
            return new NextResponse("Your free trial has expired!", { status: 403, statusText: "FORBIDDEN" });
        }

        // REQUEST TO REPLICATE
        const output = await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
                input: {
                    prompt_a: prompt
                }
            }
        );

        //  INCRESEASE USER API USAGE
        await increaseUserApiUsageLimit();

        // RETURN RESPONSE FROM REPLICATE
        return NextResponse.json(output);

    } catch (error) {

        console.log("[REPLICATE_API_ERROR]", error);
        return new NextResponse("Error while generating audio", { status: 500, statusText: "INTERNAL SERVER ERROR" });
    }

}
