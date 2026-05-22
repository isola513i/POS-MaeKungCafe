import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

interface FloatingCartBarProps {
  totalItems: number
  totalPrice: number
  onClick: () => void
}

export function FloatingCartBar({ totalItems, totalPrice, onClick }: FloatingCartBarProps) {
  if (totalItems === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Badge 
              variant="secondary" 
              className="bg-blue-600 text-white rounded-full px-3 py-1 text-sm font-medium"
            >
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </Badge>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 font-medium">Total</span>
              <span className="text-xl font-bold text-gray-900">
                ฿{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          
          <Button
            onClick={onClick}
            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-medium shadow-sm hover:shadow-md transition-all duration-200"
            size="sm"
          >
            View Cart →
          </Button>
        </div>
      </div>
    </div>
  )
}
