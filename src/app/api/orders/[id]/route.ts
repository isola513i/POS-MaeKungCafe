import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { OrderStatus, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'

const updateStatusSchema = z.object({
  status: z.nativeEnum(OrderStatus),
})

interface RouteContext {
  params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Missing order id' }, { status: 400 })
    }

    const json = await req.json()
    const parsed = updateStatusSchema.safeParse(json)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: parsed.data.status },
      include: {
        orderItems: { include: { menuItem: true } },
      },
    })

    return NextResponse.json({ data: updated }, { status: 200 })
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    console.error('[PATCH /api/orders/:id] Failed to update order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
