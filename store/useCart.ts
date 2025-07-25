import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ProductOption {
  id: string;
  name: string;
  price: number;
}

export interface ProductCategory {
  category: string;
  options: ProductOption[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
}

interface CartState {
  // Selected products for customization
  selections: Record<string, ProductOption>;
  
  // Cart items ready for checkout
  cartItems: CartItem[];
  
  // Actions for selections
  updateSelection: (category: string, option: ProductOption) => void;
  clearSelections: () => void;
  
  // Actions for cart
  addToCart: () => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed values
  getTotalPrice: () => number;
  getCartTotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      selections: {},
      cartItems: [],
      
      updateSelection: (category: string, option: ProductOption) => {
        set((state) => ({
          selections: {
            ...state.selections,
            [category]: option,
          },
        }));
      },
      
      clearSelections: () => {
        set({ selections: {} });
      },
      
      addToCart: () => {
        const { selections } = get();
        const configId = `config-${Date.now()}`;
        
        // Create a single cart item for the entire configuration
        const configItems = Object.entries(selections).map(([category, option]) => ({
          id: `${configId}-${option.id}`,
          name: `${category}: ${option.name}`,
          price: option.price,
          category,
          quantity: 1,
        }));
        
        set((state) => ({
          cartItems: [...state.cartItems, ...configItems],
        }));
      },
      
      removeFromCart: (itemId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        }));
      },
      
      updateQuantity: (itemId: string, quantity: number) => {
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },
      
      clearCart: () => {
        set({ cartItems: [] });
      },
      
      getTotalPrice: () => {
        const { selections } = get();
        return Object.values(selections).reduce((total, option) => total + option.price, 0);
      },
      
      getCartTotal: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'product-customizer-storage',
    }
  )
); 