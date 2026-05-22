import { MenuItem, Category, Order, OrderStatus, OrderWithItems } from '../../types'
import { Category as CategoryEnum, OrderStatus as OrderStatusEnum } from '@prisma/client'

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Iced Americano',
    description: 'Classic espresso with cold water and ice',
    price: 65,
    imageUrl: '/images/menu/01.jpg',
    category: CategoryEnum.COFFEE,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '2',
    name: 'Caramel Macchiato',
    description: 'Espresso with vanilla syrup, steamed milk, and caramel drizzle',
    price: 95,
    imageUrl: '/images/menu/02.jpg',
    category: CategoryEnum.COFFEE,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '3',
    name: 'Thai Iced Tea',
    description: 'Traditional Thai tea with condensed milk',
    price: 55,
    imageUrl: '/images/menu/03.jpg',
    category: CategoryEnum.TEA,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '4',
    name: 'Chocolate Croissant',
    description: 'Buttery croissant with rich chocolate filling',
    price: 45,
    imageUrl: '/images/menu/04.jpg',
    category: CategoryEnum.BAKERY,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '5',
    name: 'Pad Thai',
    description: 'Stir-fried rice noodles with shrimp, tofu, and tangy tamarind sauce',
    price: 120,
    imageUrl: '/images/menu/05.jpg',
    category: CategoryEnum.FOOD,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '6',
    name: 'Green Tea Latte',
    description: 'Matcha green tea with steamed milk',
    price: 85,
    imageUrl: '/images/menu/06.jpg',
    category: CategoryEnum.NON_COFFEE,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: '7',
    name: 'Blueberry Muffin',
    description: 'Fresh baked muffin with real blueberries',
    price: 40,
    imageUrl: '/images/menu/07.jpg',
    category: CategoryEnum.BAKERY,
    isAvailable: true,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z')
  }
]

export const mockOrders: OrderWithItems[] = [
  {
    id: 'order-1',
    tableNumber: 'A1',
    status: OrderStatusEnum.PENDING,
    totalPrice: 160,
    customerId: 'customer-1',
    orderItems: [
      {
        id: 'item-1',
        orderId: 'order-1',
        menuItemId: '1',
        quantity: 2,
        price: 65,
        size: 'Iced',
        sweetnessLevel: '50',
        specialNote: 'Less ice please',
        createdAt: new Date('2024-01-01T10:30:00Z'),
        updatedAt: new Date('2024-01-01T10:30:00Z'),
        menuItem: mockMenuItems[0]
      },
      {
        id: 'item-2',
        orderId: 'order-1',
        menuItemId: '4',
        quantity: 1,
        price: 45,
        size: 'Regular',
        sweetnessLevel: '100',
        specialNote: null,
        createdAt: new Date('2024-01-01T10:30:00Z'),
        updatedAt: new Date('2024-01-01T10:30:00Z'),
        menuItem: mockMenuItems[3]
      }
    ],
    createdAt: new Date('2024-01-01T10:30:00Z'),
    updatedAt: new Date('2024-01-01T10:30:00Z')
  },
  {
    id: 'order-2',
    tableNumber: 'B2',
    status: OrderStatusEnum.COOKING,
    totalPrice: 215,
    customerId: 'customer-2',
    orderItems: [
      {
        id: 'item-3',
        orderId: 'order-2',
        menuItemId: '2',
        quantity: 1,
        price: 95,
        size: 'Hot',
        sweetnessLevel: '75',
        specialNote: 'Extra caramel',
        createdAt: new Date('2024-01-01T11:15:00Z'),
        updatedAt: new Date('2024-01-01T11:15:00Z'),
        menuItem: mockMenuItems[1]
      },
      {
        id: 'item-4',
        orderId: 'order-2',
        menuItemId: '5',
        quantity: 1,
        price: 120,
        size: 'Regular',
        sweetnessLevel: '100',
        specialNote: 'No peanuts',
        createdAt: new Date('2024-01-01T11:15:00Z'),
        updatedAt: new Date('2024-01-01T11:15:00Z'),
        menuItem: mockMenuItems[4]
      }
    ],
    createdAt: new Date('2024-01-01T11:15:00Z'),
    updatedAt: new Date('2024-01-01T11:20:00Z')
  },
  {
    id: 'order-3',
    tableNumber: 'C3',
    status: OrderStatusEnum.COMPLETED,
    totalPrice: 125,
    customerId: null,
    orderItems: [
      {
        id: 'item-5',
        orderId: 'order-3',
        menuItemId: '3',
        quantity: 1,
        price: 55,
        size: 'Iced',
        sweetnessLevel: '25',
        specialNote: null,
        createdAt: new Date('2024-01-01T09:45:00Z'),
        updatedAt: new Date('2024-01-01T09:45:00Z'),
        menuItem: mockMenuItems[2]
      },
      {
        id: 'item-6',
        orderId: 'order-3',
        menuItemId: '7',
        quantity: 2,
        price: 40,
        size: 'Regular',
        sweetnessLevel: '100',
        specialNote: 'Warm it up',
        createdAt: new Date('2024-01-01T09:45:00Z'),
        updatedAt: new Date('2024-01-01T09:45:00Z'),
        menuItem: mockMenuItems[6]
      }
    ],
    createdAt: new Date('2024-01-01T09:45:00Z'),
    updatedAt: new Date('2024-01-01T10:15:00Z')
  }
]
