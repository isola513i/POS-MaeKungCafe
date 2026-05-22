// Generated TypeScript types for MaeKung Cafe POS System
// These types are auto-generated from Prisma schema and should be used as the Source of Truth

import {
  Customer,
  MenuItem,
  Order,
  OrderItem,
  Category,
  OrderStatus,
  Prisma
} from '@prisma/client'

// Export all Prisma types
export type {
  Customer,
  MenuItem,
  Order,
  OrderItem,
  Category,
  OrderStatus
}

// Export Prisma types for complex queries
export type { Prisma }

// Common type aliases for better DX
export type OrderWithItems = Order & {
  orderItems: (OrderItem & {
    menuItem: MenuItem
  })[]
}

export type OrderWithCustomer = Order & {
  customer?: Customer
  orderItems: (OrderItem & {
    menuItem: MenuItem
  })[]
}

export type MenuItemWithCategory = MenuItem

// API Request/Response types
export type CreateOrderRequest = {
  tableNumber: string
  items: Array<{
    menuItemId: string
    quantity: number
    size: string
    sweetnessLevel: string
    specialNote?: string
  }>
  customerId?: string
}

export type UpdateOrderStatusRequest = {
  orderId: string
  status: OrderStatus
}

// Customer LIFF types
export type LineUserProfile = {
  userId: string
  displayName: string
  pictureUrl?: string
}

// Kitchen Dashboard types
export type OrderKanbanItem = OrderWithItems & {
  customer?: Customer
}
