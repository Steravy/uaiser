import increaseUserApiUsageLimit from "@/service/increase-api-usage-limit";
import checkUserApiUsageLimit from "@/service/user-api-usage-limit";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Replicate from 'replicate';

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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt
                }
            }
        );

        //  INCRESEASE USER API USAGE
        await increaseUserApiUsageLimit();

        // RETURN RESPONSE FROM REPLICATE
        return NextResponse.json(output);

    } catch (error) {

        console.log("[REPLICATE_API_ERROR]", error);
        return new NextResponse("Error while generating video", { status: 500, statusText: "INTERNAL SERVER ERROR" });
    }

}
