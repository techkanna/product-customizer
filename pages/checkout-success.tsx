import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/store/useCart';

export default function CheckoutSuccess() {
  const { clearCart, clearSelections } = useCart();

  useEffect(() => {
    // Clear cart and selections after successful checkout
    clearCart();
    clearSelections();
  }, [clearCart, clearSelections]);

  return (
    <>
      <Head>
        <title>Order Successful - PC Builder</title>
        <meta name="description" content="Your order has been successfully placed" />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="card text-center">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                🎉 Order Successful!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your custom PC configuration has been ordered successfully.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="font-semibold text-gray-900 mb-2">What happens next?</h2>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• We'll begin assembling your custom PC</li>
                <li>• Estimated delivery: 5-7 business days</li>
                <li>• You'll receive tracking information once shipped</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/" className="btn-primary w-full inline-block text-center">
                Build Another PC
              </Link>
              <Link href="/orders" className="btn-secondary w-full inline-block text-center">
                View Order History
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 