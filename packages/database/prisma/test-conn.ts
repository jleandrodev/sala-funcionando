import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../../../.env') })
process.env.DATABASE_URL = process.env.DIRECT_URL

const prisma = new PrismaClient()

async function test() {
  console.log('Testing connection...')
  try {
    await prisma.$connect()
    console.log('Connected successfully!')
    const count = await prisma.protocolo.count()
    console.log('Protocol count:', count)
  } catch (e) {
    console.error('Connection failed:', e)
  } finally {
    await prisma.$disconnect()
  }
}

test()
