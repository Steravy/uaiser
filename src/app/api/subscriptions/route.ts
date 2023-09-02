import { auth, currentUser } from '@clerk/nextjs';

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/providers/stripe-payment-service';
import prismaDB from '@/lib/prismadb';

import { appAbsoluteUrl } from '@/lib/utils';
import { UserSubscription } from '@prisma/client';

const redirectToSettingsPage = appAbsoluteUrl('/settings');

export async function GET(request: NextRequest) {

    try {

        const { userId } = auth();
        const user = await currentUser()

        // if there is no user logged in
        if (!userId || !user)
            return new NextResponse("Login to perform this operation!", { status: 401, statusText: "UNAUTHORIZED" });

        const userSubscription = await prismaDB.userSubscription.findUnique({
            where: {
                userId
            }
        })

        if (userSubscription && userSubscription.stripeSubscriptionId) {

            // If user already subscribed, redirect to settings page to cancel or perform other operation.... 
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustumerId!,
                return_url: redirectToSettingsPage
            })

            return new NextResponse(JSON.stringify({ url: stripeSession.url }));
        }

        // If user is not subscribed, redirect to subscribe/checkout to subscribe for the first time
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: redirectToSettingsPage,
            cancel_url: redirectToSettingsPage,
            payment_method_types: ['card'],
            mode: 'subscription',
            billing_address_collection: 'auto',
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'USD',
                        product_data: {
                            name: 'Uaiser Premium',
                            description: 'Unlimited access to Uaiser Ai tools',
                        },
                        unit_amount: 1500,
                        recurring: {
                            interval: 'month'
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                userId
            }
        });

        return new NextResponse(JSON.stringify({ url: stripeSession.url }));

    } catch (error) {

        console.log("Stripe Error", error);

        return new NextResponse(
            "Something went wrong with your payment process. Please try again later.",
            { status: 500, statusText: "INTERNAL SERVER ERROR" }
        )
    }
}
