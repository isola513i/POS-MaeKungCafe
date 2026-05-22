import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { OrderStatus } from '@prisma/client'
import { prisma } from '@/lib/prisma'

// Per agent.md Rule 6:
//  - Validate every payload with zod before touching Prisma.
//  - NEVER trust the client-provided price. Recalculate from DB.
const createOrderItemSchema = z.object({
  menuItemId: z.string().min(1),
  quantity: z.number().int().positive().max(99),
  size: z.string().min(1).max(32),
  sweetnessLevel: z.string().min(1).max(8),
  specialNote: z.string().max(120).optional().nullable(),
})

const createOrderSchema = z.object({
  tableNumber: z.string().min(1).max(16),
  customerId: z.string().optional().nullable(),
  items: z.array(createOrderItemSchema).min(1).max(50),
})

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = createOrderSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { tableNumber, customerId, items } = parsed.data

    // Server-side price recalculation: fetch each menu item once and verify it
    // is available, then compute the authoritative total ourselves.
    const menuItemIds = Array.from(new Set(items.map((i) => i.menuItemId)))
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: menuItemIds }, isAvailable: true },
    })

    if (menuItems.length !== menuItemIds.length) {
      return NextResponse.json(
        { error: 'One or more menu items are unavailable or invalid.' },
        { status: 400 }
      )
    }

    const menuItemMap = new Map(menuItems.map((m) => [m.id, m]))

    let totalPrice = 0
    const orderItemsCreate = items.map((item) => {
      const menuItem = menuItemMap.get(item.menuItemId)!
      const linePrice = menuItem.price
      totalPrice += linePrice * item.quantity
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: linePrice,
        size: item.size,
        sweetnessLevel: item.sweetnessLevel,
        specialNote: item.specialNote ?? null,
      }
    })

    const order = await prisma.order.create({
      data: {
        tableNumber,
        status: OrderStatus.PENDING,
        totalPrice,
        customerId: customerId ?? null,
        orderItems: {
          create: orderItemsCreate,
        },
      },
      include: {
        orderItems: { include: { menuItem: true } },
      },
    })

    return NextResponse.json({ data: order }, { status: 201 })
  } catch (error) {
    console.error('[POST /api/orders] Failed to create order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}
