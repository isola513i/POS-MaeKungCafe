"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import { mockMenuItems } from '@/lib/mock-data'
import { MenuItemCard } from '@/components/customer/MenuItemCard'
import { CategoryFilter } from '@/components/customer/CategoryFilter'
import { FloatingCartBar } from '@/components/customer/FloatingCartBar'
import { MenuItemModifierDialog } from '@/components/customer/MenuItemModifierDialog'
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

  const { addItem, getTotalItems, getTotalPrice } = useCart()

  const filteredItems = mockMenuItems.filter(
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
        {filteredItems.length === 0 ? (
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
