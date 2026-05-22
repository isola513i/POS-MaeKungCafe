"use client"

import { useState } from 'react'
import { MenuItem } from '../../../types'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'
import { ImageOff } from 'lucide-react'

interface MenuItemCardProps {
  item: MenuItem
  onAdd: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  const [imgError, setImgError] = useState(false)
  const showImage = !!item.imageUrl && !imgError

  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm bg-white border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
        {showImage ? (
          <Image
            src={item.imageUrl!}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-400">
            <ImageOff className="w-8 h-8" />
            <span className="text-xs">No image</span>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
            {item.name}
          </h3>
          
          {item.description && (
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-gray-900">
              ฿{item.price}
            </span>
            
            <Button
              onClick={() => onAdd(item)}
              className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
              size="sm"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
