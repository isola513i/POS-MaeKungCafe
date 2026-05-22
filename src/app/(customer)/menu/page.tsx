"use client"

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import { MenuItemCard } from '@/components/customer/MenuItemCard'
import { CategoryFilter } from '@/components/customer/CategoryFilter'
import { FloatingCartBar } from '@/components/customer/FloatingCartBar'
import { MenuItemModifierDialog } from '@/components/customer/MenuItemModifierDialog'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'
import { MenuItem } from '../../../../types'

const CATEGORIES: Category[] = [
  Category.COFFEE,
  Category.NON_COFFEE,
  Category.TEA,
  Category.BAKERY,
  Category.FOOD,
]

export default function MenuPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.COFFEE)
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null)
  const [modifierOpen, setModifierOpen] = useState(false)

  // Real data state (replaces mockMenuItems)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const { addItem, getTotalItems, getTotalPrice } = useCart()

  const fetchMenu = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/menu', { cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      const json = await res.json()
      setMenuItems(json.data ?? [])
    } catch (err) {
      console.error('Failed to load menu:', err)
      setError('We couldn\'t load the menu. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory
  )

  const handleOpenModifier = (item: MenuItem) => {
    setActiveItem(item)
    setModifierOpen(true)
  }

  const handleConfirmAdd = (size: string, sweetness: string, note?: string) => {
    if (!activeItem) return
    addItem(activeItem, size, sweetness, note)
  }

  const handleViewCart = () => {
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="px-4 pt-6 pb-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            MaeKung Cafe
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Order fresh, served with love
          </p>
        </div>

        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </header>

      {/* Main Content */}
      <main className="px-4 pt-4 pb-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white shadow-sm overflow-hidden border border-gray-100"
              >
                <div className="aspect-square bg-gray-100 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
                  <div className="flex items-center justify-between pt-2">
                    <div className="h-5 bg-gray-100 rounded animate-pulse w-16" />
                    <div className="h-9 bg-gray-100 rounded-full animate-pulse w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">{error}</p>
            <Button
              onClick={fetchMenu}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 font-medium shadow-sm"
            >
              Retry
            </Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-500 text-sm">
              No items available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAdd={handleOpenModifier}
              />
            ))}
          </div>
        )}
      </main>

      {/* Floating Cart Bar */}
      <FloatingCartBar
        totalItems={getTotalItems()}
        totalPrice={getTotalPrice()}
        onClick={handleViewCart}
      />

      {/* Modifier Dialog */}
      <MenuItemModifierDialog
        item={activeItem}
        open={modifierOpen}
        onOpenChange={setModifierOpen}
        onConfirm={handleConfirmAdd}
      />
    </div>
  )
}
