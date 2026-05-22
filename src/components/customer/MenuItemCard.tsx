import { MenuItem } from '../../../types'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import Image from 'next/image'

interface MenuItemCardProps {
  item: MenuItem
  onAdd: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAdd }: MenuItemCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl shadow-sm bg-white border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative aspect-square">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No image</span>
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
