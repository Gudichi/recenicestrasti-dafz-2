import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const { data } = await req.json();
  const { amount } = data;

  if (amount <= 0) {
    return new NextResponse(JSON.stringify({ error: "Invalid amount" }), {
      status: 400,
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.trunc(Number(amount) * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    return new NextResponse(paymentIntent.client_secret, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
