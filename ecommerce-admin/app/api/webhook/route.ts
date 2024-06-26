import {headers} from "next/headers";
import {NextResponse} from "next/server";
import Stripe from "stripe";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = Stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        return new NextResponse(`Webhook Error: ${err.message}`, {status: 400});
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
        address?.line1,
        address?.line2,
        address?.city,
        address?.state,
        address?.postal_code,
        address?.country
    ];

    const addressString = addressComponents.filter(c => c !== null).join(", ");

    if (event.type === "checkout.session.completed" && session?.metadata) {
        const {projectId, orderId} = session.metadata;

        if (projectId !== "alpha-store" && !orderId) {
            return new NextResponse(null, {status: 200});
        }

        const order = await prismadb.order.update({
            where: {
                 id: orderId
            },
            data: {
                isPaid: true,
                address: addressString,
                phone: session?.customer_details?.phone || '',
            },
            include: {
                orderItems: true
            }
        });

        // const productIds = order.orderItems.map((orderItem) => orderItem.productId);

        // TODO: Update all products in the order to be archived
        // await prismadb.product.updateMany({
        //     where: {
        //         id: {
        //             in: [...productIds]
        //         }
        //     },
        //     data: {
        //         isArchived: true
        //     }
        // });
    }

    return new NextResponse(null, {status: 200});
}