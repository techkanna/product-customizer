import Head from 'next/head';
import { useState } from 'react';
import ProductCustomizer from '@/components/ProductCustomizer';
import Cart from '@/components/Cart';
import Header from '@/components/Header';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Head>
        <title>PC Builder - Custom Computer Configurator</title>
        <meta name="description" content="Build your custom PC with our interactive configurator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <Header onCartClick={() => setIsCartOpen(true)} />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Product Customizer */}
            <div className="lg:col-span-2">
              <div className="card">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  🖥️ Build Your Custom PC
                </h1>
                <p className="text-gray-600 mb-6">
                  Select components to build your perfect computer. Prices update in real-time.
                </p>
                <ProductCustomizer />
              </div>
            </div>

            {/* Desktop Cart Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <Cart />
              </div>
            </div>
          </div>
        </main>

        {/* Mobile Cart Modal */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)} />
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Cart />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 