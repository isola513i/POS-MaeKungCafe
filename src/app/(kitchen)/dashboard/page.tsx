"use client"

import { useState } from 'react'
import { OrderStatus } from '@prisma/client'
import { mockOrders } from '@/lib/mock-data'
import { OrderWithItems } from '../../../../types'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'

const COLUMNS: {
  status: OrderStatus
  title: string
  accent: string
  headerBg: string
  borderColor: string
  dot: string
}[] = [
  {
    status: OrderStatus.PENDING,
    title: 'Pending',
    accent: 'text-amber-400',
    headerBg: 'bg-amber-500/10 border-amber-500/30',
    borderColor: 'border-l-amber-500',
    dot: 'bg-amber-500',
  },
  {
    status: OrderStatus.COOKING,
    title: 'Cooking',
    accent: 'text-blue-400',
    headerBg: 'bg-blue-500/10 border-blue-500/30',
    borderColor: 'border-l-blue-500',
    dot: 'bg-blue-500',
  },
  {
    status: OrderStatus.COMPLETED,
    title: 'Completed',
    accent: 'text-emerald-400',
    headerBg: 'bg-emerald-500/10 border-emerald-500/30',
    borderColor: 'border-l-emerald-500',
    dot: 'bg-emerald-500',
  },
]

function formatTime(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface OrderCardProps {
  order: OrderWithItems
  borderColor: string
  onAdvance?: (orderId: string) => void
  onArchive?: (orderId: string) => void
}

function OrderCard({ order, borderColor, onAdvance, onArchive }: OrderCardProps) {
  const isPending = order.status === OrderStatus.PENDING
  const isCooking = order.status === OrderStatus.COOKING
  const isCompleted = order.status === OrderStatus.COMPLETED

  return (
    <Card
      className={`bg-zinc-900 border-zinc-700 border-l-8 ${borderColor} rounded-md p-0 overflow-hidden`}
    >
      {/* Header: Table Number */}
      <div className="px-5 pt-4 pb-3 border-b border-zinc-800 flex items-end justify-between">
        <div>
          <span className="text-sm font-semibold text-zinc-400 uppercase tracking-widest">
            Table
          </span>
          <div className="text-5xl font-black text-white leading-none mt-1">
            {order.tableNumber}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-zinc-500 uppercase tracking-wider">
            Order #
          </span>
          <div className="text-lg text-zinc-300 font-mono">
            {order.id.slice(-4).toUpperCase()}
          </div>
          <div className="text-lg text-zinc-300 font-medium tabular-nums mt-1">
            {formatTime(order.createdAt)}
          </div>
        </div>
      </div>

      {/* Body: Items */}
      <div className="px-5 py-4 space-y-3">
        {order.orderItems.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-3xl font-black text-white tabular-nums">
                  {item.quantity}×
                </span>
                <span className="text-2xl font-bold text-white truncate">
                  {item.menuItem.name}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pl-9 text-base">
              <Badge
                variant="secondary"
                className="bg-zinc-800 text-zinc-200 border-zinc-700 text-base px-2 py-0.5"
              >
                {item.size}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-zinc-800 text-zinc-200 border-zinc-700 text-base px-2 py-0.5"
              >
                Sweet {item.sweetnessLevel}%
              </Badge>
            </div>
            {item.specialNote && (
              <div className="ml-9 mt-2 text-xl text-yellow-400 font-bold bg-yellow-950/50 border border-yellow-700/40 p-2 rounded">
                ⚠ {item.specialNote}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer: Action */}
      <div className="px-5 pb-5 pt-1">
        {isPending && (
          <Button
            onClick={() => onAdvance?.(order.id)}
            className="w-full h-16 text-xl font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-md"
          >
            Start Cooking →
          </Button>
        )}
        {isCooking && (
          <Button
            onClick={() => onAdvance?.(order.id)}
            className="w-full h-16 text-xl font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md"
          >
            Mark Ready ✓
          </Button>
        )}
        {isCompleted && (
          <Button
            onClick={() => onArchive?.(order.id)}
            variant="ghost"
            className="w-full h-12 text-base font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md"
          >
            Archive
          </Button>
        )}
      </div>
    </Card>
  )
}

export default function KitchenDashboardPage() {
  const [orders, setOrders] = useState<OrderWithItems[]>(mockOrders)

  const advanceOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order
        if (order.status === OrderStatus.PENDING) {
          return { ...order, status: OrderStatus.COOKING, updatedAt: new Date() }
        }
        if (order.status === OrderStatus.COOKING) {
          return { ...order, status: OrderStatus.READY, updatedAt: new Date() }
        }
        return order
      })
    )
  }

  const archiveOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  // Treat READY as part of "Completed" column for the simple 3-column MVP view.
  const getOrdersByStatus = (status: OrderStatus) => {
    if (status === OrderStatus.COMPLETED) {
      return orders.filter(
        (o) => o.status === OrderStatus.COMPLETED || o.status === OrderStatus.READY
      )
    }
    return orders.filter((o) => o.status === status)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-100px)]">
        {COLUMNS.map((col) => {
          const columnOrders = getOrdersByStatus(col.status)
          return (
            <div
              key={col.status}
              className="flex flex-col bg-zinc-900/40 border border-zinc-800 rounded-lg overflow-hidden"
            >
              {/* Column Header */}
              <div
                className={`flex items-center justify-between px-5 py-4 border-b ${col.headerBg}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${col.dot}`} />
                  <h2 className={`text-2xl font-bold ${col.accent}`}>
                    {col.title}
                  </h2>
                </div>
                <span className="text-2xl font-black text-white tabular-nums bg-zinc-800 px-3 py-1 rounded">
                  {columnOrders.length}
                </span>
              </div>

              {/* Column Body */}
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                  {columnOrders.length === 0 ? (
                    <div className="flex items-center justify-center h-40 text-zinc-600 text-lg font-medium">
                      No orders
                    </div>
                  ) : (
                    columnOrders.map((order) => (
                      <OrderCard
                        key={order.id}
                        order={order}
                        borderColor={col.borderColor}
                        onAdvance={advanceOrder}
                        onArchive={archiveOrder}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          )
        })}
      </div>
    </div>
  )
}
