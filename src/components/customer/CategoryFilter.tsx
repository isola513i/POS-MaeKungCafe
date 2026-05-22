import { Category } from '../../../types'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: Category
  onSelect: (category: Category) => void
}

export function CategoryFilter({ categories, selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full pb-2">
      <div className="flex space-x-2 px-4 py-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'secondary'}
            onClick={() => onSelect(category)}
            className={`
              rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap
              transition-all duration-200 shadow-sm hover:shadow-md
              ${selectedCategory === category 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }
            `}
            size="sm"
          >
            {category.charAt(0) + category.slice(1).toLowerCase()}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
