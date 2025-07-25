import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { 
  apiVersion: '2023-10-16' 
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid items' });
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'inr',
        product_data: { 
          name: item.name,
          description: `${item.category} component`
        },
        unit_amount: Math.round(item.price * 100), // Convert to paise
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
      metadata: {
        orderType: 'custom_pc_build',
      },
      shipping_address_collection: {
        allowed_countries: ['IN'], // Adjust based on your target countries
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe session creation error:', error);
    res.status(500).json({ 
      message: 'Error creating checkout session',
      error: error.message 
    });
  }
} 