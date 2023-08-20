import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const getUserApiUsageLimitCount = async () => {

    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    const userCurrentApiUsageCount = await prismaDB.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (!userCurrentApiUsageCount) {
        return 0;
    }

    return userCurrentApiUsageCount.count;


}

export default getUserApiUsageLimitCount;