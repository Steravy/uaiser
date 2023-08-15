import { FREE_LIMIT_RANGE } from "@/lib/constants";
import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const checkUserApiUsageLimit = async () => {

    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userCurrentApiUsage = await prismaDB.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userCurrentApiUsage || userCurrentApiUsage.count < FREE_LIMIT_RANGE) {

        return true;
    }
    else {
        return false;
    }


};

export default checkUserApiUsageLimit;