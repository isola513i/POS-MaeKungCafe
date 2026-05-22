import { PrismaClient } from '@prisma/client'
import { mockMenuItems } from '../src/lib/mock-data'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  console.log(`📦 Upserting ${mockMenuItems.length} menu items...`)

  for (const item of mockMenuItems) {
    await prisma.menuItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
        isAvailable: item.isAvailable,
      },
      create: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category,
        isAvailable: item.isAvailable,
      },
    })
    console.log(`  ✓ ${item.name} (${item.category})`)
  }

  const total = await prisma.menuItem.count()
  console.log(`✅ Seed complete. Total menu items in DB: ${total}`)
}

main()
  .catch((error) => {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
