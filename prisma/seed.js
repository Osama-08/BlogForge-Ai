const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const categories = [
        { name: 'Technology', slug: 'technology', description: 'Latest tech news and tutorials' },
        { name: 'Lifestyle', slug: 'lifestyle', description: 'Daily life, health, and wellness' },
        { name: 'Education', slug: 'education', description: 'Learning resources and guides' },
        { name: 'Business', slug: 'business', description: 'Entrepreneurship and corporate insights' },
        { name: 'AI & Machine Learning', slug: 'ai-ml', description: 'Artificial Intelligence trends' },
    ]

    for (const category of categories) {
        await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        })
    }

    console.log('Categories seeded!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
