"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { MenuItem } from '../../../types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'

const SIZE_OPTIONS = ['Hot', 'Iced', 'Frappe'] as const
const SWEETNESS_OPTIONS = ['0', '25', '50', '75', '100'] as const

interface MenuItemModifierDialogProps {
  item: MenuItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (size: string, sweetness: string, note?: string) => void
}

export function MenuItemModifierDialog({
  item,
  open,
  onOpenChange,
  onConfirm,
}: MenuItemModifierDialogProps) {
  const [size, setSize] = useState<string>('Iced')
  const [sweetness, setSweetness] = useState<string>('100')
  const [note, setNote] = useState<string>('')

  // Reset state every time the dialog opens with a new item
  useEffect(() => {
    if (open) {
      setSize('Iced')
      setSweetness('100')
      setNote('')
    }
  }, [open, item?.id])

  if (!item) return null

  const handleConfirm = () => {
    onConfirm(size, sweetness, note.trim() ? note.trim() : undefined)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden rounded-2xl border-gray-100">
        {/* Image header */}
        <div className="relative w-full aspect-[4/3] bg-gray-100">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
        </div>

        <div className="px-6 pt-4 pb-6 space-y-5">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="text-2xl font-bold text-gray-900 tracking-tight">
              {item.name}
            </DialogTitle>
            {item.description && (
              <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Size */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {SIZE_OPTIONS.map((opt) => {
                const active = size === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSize(opt)}
                    className={`
                      rounded-full px-5 py-2 text-sm font-medium border transition-all
                      ${active
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sweetness */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Sweetness Level
            </label>
            <div className="flex flex-wrap gap-2">
              {SWEETNESS_OPTIONS.map((opt) => {
                const active = sweetness === opt
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSweetness(opt)}
                    className={`
                      rounded-full px-4 py-2 text-sm font-medium border transition-all min-w-[3.5rem]
                      ${active
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                  >
                    {opt}%
                  </button>
                )
              })}
            </div>
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label htmlFor="special-note" className="text-sm font-semibold text-gray-900">
              Special Note <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <Textarea
              id="special-note"
              value={note}
              onChange={(e) => setNote(e.target.value.slice(0, 120))}
              placeholder="e.g. Less ice, no peanuts"
              className="rounded-xl resize-none border-gray-200 bg-gray-50 focus-visible:ring-blue-500"
              rows={2}
            />
            <div className="text-xs text-gray-400 text-right">
              {note.length}/120
            </div>
          </div>

          {/* Confirm */}
          <Button
            onClick={handleConfirm}
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold shadow-sm hover:shadow-md transition-all"
          >
            Add to Cart · ฿{item.price.toFixed(2)}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
