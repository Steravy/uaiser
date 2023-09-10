import { auth } from "@clerk/nextjs";
import prismaDB from "@/lib/prismadb";

const DAYS_IN_MILISECONDS = 86_400_000;

export const isUserSubscribed = async () => {

    const { userId } = auth();

    if (!userId) {
        return false;
    };

    const userSubscription = await prismaDB.userSubscription.findUnique({
        where: {
            userId
        },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustumerId: true,
            stripePriceId: true
        }
    });

    if (!userSubscription) {
        return false;
    };

    // Check if subscription is still valid by comparing end date (added one more day to end period date)
    const isSubscriptionValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAYS_IN_MILISECONDS > Date.now();

    return !!isSubscriptionValid; // Returns true if subscription is still valid (cast to boolean)

}