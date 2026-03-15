import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../../.env') })

const prisma = new PrismaClient()

async function main() {
  const professor = await prisma.professor.upsert({
    where: { email: 'contato@johnlenon.com.br' },
    update: {},
    create: {
      userId: 'dummy-user-id',
      email: 'contato@johnlenon.com.br',
      name: 'Professor John',
    },
  })

  console.log('✅ Dummy Professor created/found:', professor)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
