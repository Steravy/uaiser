import Stripe from "stripe";
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";

import prismaDB from "@/lib/prismadb";
import { stripe } from "@/providers/stripe-payment-service";

export async function POST(request: NextRequest) {

    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;

    let stripeEvent: Stripe.Event;

    try {

        stripeEvent = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );

    } catch (error: any) {

        return new NextResponse(
            `Something went wrong while processing your subscription: ${error?.message}`,
            {
                status: 500,
                statusText: "INTERNAL SERVER ERROR",
            }
        )
    }

    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    if (stripeEvent.type === "checkout.session.completed") {

        if (!session?.metadata?.userId) {
            return new NextResponse(
                "User must be logged in to subscribe to Uaiser Premium",
                { status: 401, statusText: "UNAUTHORIZED" }
            )
        };

        const userSubscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await prismaDB.userSubscription.create({
            data: {
                userId: session.metadata.userId,
                stripeSubscriptionId: userSubscription.id,
                stripeCustumerId: userSubscription.customer as string,
                stripePriceId: userSubscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(userSubscription.current_period_end * 1000),
            }
        });

    }

    if (stripeEvent.type === "invoice.payment_succeeded") {

        const userSubscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await prismaDB.userSubscription.update({
            where: {
                stripeSubscriptionId: userSubscription.id,
            },
            data: {
                stripeCurrentPeriodEnd: new Date(userSubscription.current_period_end * 1000),
            }
        });

    }

    return new NextResponse('Subscribed!', { status: 200, statusText: "OK" });
}