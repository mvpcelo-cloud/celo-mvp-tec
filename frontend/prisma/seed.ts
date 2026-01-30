
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    // Create Manager User
    const manager = await prisma.user.upsert({
        where: { email: 'manager@celo.org' },
        update: {},
        create: {
            email: 'manager@celo.org',
            role: 'HOTEL',
        }
    });

    // Create Hotel
    const hotel = await prisma.hotel.create({
        data: {
            name: 'Gran Hotel Celo',
            description: 'Luxury experience powered by Celo Blockchain. Enjoy transparent bookings and seamless crypto payments.',
            address: '123 Blockchain Blvd, San Francisco, CA',
            managerId: manager.id,
            images: [
                'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
            ],
            rooms: {
                create: [
                    {
                        name: 'Ocean View Suite',
                        price: 100,
                        capacity: 2,
                        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'],
                        description: 'Direct ocean views with a king-size bed and private balcony.'
                    },
                    {
                        name: 'Family Garden Room',
                        price: 200,
                        capacity: 4,
                        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
                        description: 'Spacious ground floor room with direct access to the gardens.'
                    }
                ]
            }
        }
    });

    console.log(`✅ Seeded hotel: ${hotel.name}`);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
