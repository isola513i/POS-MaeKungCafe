"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Trash2, Plus, Minus, ShoppingBag, Loader2 } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitOrder = async () => {
    if (isSubmitting || items.length === 0) return
    setIsSubmitting(true)
    try {
      // API expects tableNumber as a string and a normalized item shape.
      // Hardcoded to "1" until QR-based table detection is implemented.
      const payload = {
        tableNumber: '1',
        totalPrice: getTotalPrice(),
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          size: item.size,
          sweetnessLevel: item.sweetnessLevel,
          specialNote: item.specialNote,
        })),
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      clearCart()
      alert('Order sent to the kitchen!')
      router.push('/menu')
    } catch (err) {
      console.error('Failed to submit order:', err)
      alert('Could not send your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Empty State
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={() => router.push('/menu')}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back to menu"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">My Order</h1>
            <div className="w-10 h-10" />
          </div>
        </header>

        {/* Empty Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-sm text-gray-500 mb-8 max-w-xs">
            Looks like you haven't added anything yet. Browse our menu to get started.
          </p>
          <Button
            onClick={() => router.push('/menu')}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-200"
          >
            Go back to Menu
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="flex items-center justify-between px-4 py-4">
          <button
            onClick={() => router.push('/menu')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Back to menu"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">My Order</h1>
          <div className="w-10 h-10" />
        </div>
      </header>

      {/* Cart Items */}
      <main className="px-4 pt-4 pb-40">
        <div className="space-y-3">
          {items.map((item) => (
            <Card
              key={item.cartItemId}
              className="rounded-2xl border-gray-100 shadow-sm bg-white overflow-hidden"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight">
                      {item.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-gray-500">
                      <span>{item.size}</span>
                      <span aria-hidden>·</span>
                      <span>Sweetness {item.sweetnessLevel}%</span>
                    </div>
                    {item.specialNote && (
                      <p className="mt-1 text-xs text-gray-500 italic line-clamp-2">
                        Note: {item.specialNote}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <Separator className="my-3" />

                <div className="flex items-center justify-between">
                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, -1)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-900" />
                    </button>
                    <span className="text-sm font-semibold text-gray-900 w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, 1)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 text-gray-900" />
                    </button>
                  </div>

                  <span className="text-lg font-bold text-gray-900">
                    ฿{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Sticky Bottom Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                ฿{getTotalPrice().toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleSubmitOrder}
              disabled={isSubmitting}
              className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </span>
              ) : (
                'Submit Order'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
