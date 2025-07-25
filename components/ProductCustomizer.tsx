import { useState, useEffect } from 'react';
import { useCart, type ProductCategory } from '@/store/useCart';
import productsData from '@/data/products.json';

export default function ProductCustomizer() {
  const { selections, updateSelection, getTotalPrice, addToCart } = useCart();
  const [products] = useState<ProductCategory[]>(productsData);

  const totalPrice = getTotalPrice();
  const isConfigurationComplete = products.every(category => 
    selections[category.category]
  );

  const handleAddToCart = () => {
    if (isConfigurationComplete) {
      addToCart();
      // Show success message (you could add a toast notification here)
      alert('Configuration added to cart!');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Component Selection */}
      <div className="space-y-4">
        {products.map((category) => (
          <div key={category.category} className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              {category.category}
              {selections[category.category] && (
                <span className="ml-2 text-sm text-green-600">✓ Selected</span>
              )}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.options.map((option) => {
                const isSelected = selections[category.category]?.id === option.id;
                
                return (
                  <div
                    key={option.id}
                    className={`border rounded-lg p-3 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => updateSelection(category.category, option)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{option.name}</h4>
                        <p className="text-sm text-gray-600">{formatPrice(option.price)}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        isSelected 
                          ? 'border-primary-500 bg-primary-500' 
                          : 'border-gray-300'
                      }`}>
                        {isSelected && (
                          <div className="w-full h-full rounded-full bg-primary-500 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Configuration Summary */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Configuration Summary</h3>
        
        {Object.keys(selections).length === 0 ? (
          <p className="text-gray-500">No components selected yet</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(selections).map(([category, option]) => (
              <div key={category} className="flex justify-between items-center">
                <span className="text-gray-700">
                  <strong>{category}:</strong> {option.name}
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(option.price)}
                </span>
              </div>
            ))}
            
            <div className="border-t pt-2 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-primary-600">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <div className="mt-6">
          <button
            onClick={handleAddToCart}
            disabled={!isConfigurationComplete}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              isConfigurationComplete
                ? 'bg-primary-600 hover:bg-primary-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isConfigurationComplete 
              ? '🛒 Add Configuration to Cart' 
              : `Select ${products.length - Object.keys(selections).length} more component${products.length - Object.keys(selections).length !== 1 ? 's' : ''}`
            }
          </button>
        </div>
      </div>
    </div>
  );
} 