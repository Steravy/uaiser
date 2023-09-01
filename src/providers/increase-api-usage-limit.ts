import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

const increaseUserApiUsageLimit = async () => {

    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userApiUsageLimit = await prismaDB.userApiLimit.findUnique({
        where: {
            userId
        }
    });

    if (userApiUsageLimit) {

        await prismaDB.userApiLimit.update({
            where: {
                userId
            },
            data: {
                count: userApiUsageLimit.count + 1
            }
        })
    }
    else {

        await prismaDB.userApiLimit.create({
            data: {
                userId,
                count: 1
            }
        })
    }
};

export default increaseUserApiUsageLimit;