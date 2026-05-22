import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MenuItem } from '../../types'

export interface CartItem extends MenuItem {
  quantity: number
  size: string
  sweetnessLevel: string
  specialNote: string | null
  cartItemId: string // Unique cart item identifier
}

interface CartState {
  items: CartItem[]
  addItem: (item: MenuItem, size: string, sweetness: string, note?: string) => void
  removeItem: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, delta: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item: MenuItem, size: string, sweetness: string, note?: string) => {
        const { items } = get()
        
        // Check if exact same item with same size and sweetness already exists
        const existingItemIndex = items.findIndex(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.size === size &&
            cartItem.sweetnessLevel === sweetness &&
            cartItem.specialNote === (note || null)
        )

        if (existingItemIndex !== -1) {
          // Update quantity of existing item
          set((state) => ({
            items: state.items.map((cartItem, index) =>
              index === existingItemIndex
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          }))
        } else {
          // Add new item to cart
          const newCartItem: CartItem = {
            ...item,
            quantity: 1,
            size,
            sweetnessLevel: sweetness,
            specialNote: note || null,
            cartItemId: `${item.id}-${size}-${sweetness}-${Date.now()}` // Unique cart item ID
          }
          set((state) => ({
            items: [...state.items, newCartItem]
          }))
        }
      },

      removeItem: (cartItemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId)
        }))
      },

      updateQuantity: (cartItemId: string, delta: number) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) =>
              item.cartItemId === cartItemId
                ? { ...item, quantity: item.quantity + delta }
                : item
            )
            .filter((item) => item.quantity > 0) // Remove items with quantity 0

          return { items: updatedItems }
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotalItems: () => {
        const { items } = get()
        return items.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'maekung-cart',
      partialize: (state) => ({ items: state.items }) // Only persist items
    }
  )
)
