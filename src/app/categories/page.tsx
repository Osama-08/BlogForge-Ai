import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: { posts: true },
            },
        },
    })

    return (
        <div className="container py-16 md:py-24">
            <div className="flex flex-col items-center text-center mb-12 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                    Explore Categories
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Discover stories, tutorials, and insights across a variety of topics.
                    Find exactly what you&apos;re looking for.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => (
                    <Link key={category.id} href={`/blog?category=${category.slug}`}>
                        <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer group">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="group-hover:text-primary transition-colors">
                                        {category.name}
                                    </CardTitle>
                                    <Badge variant="secondary">
                                        {category._count.posts} Posts
                                    </Badge>
                                </div>
                                <CardDescription>
                                    {category.description || "Browse posts in this category."}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>

            {categories.length === 0 && (
                <div className="text-center text-muted-foreground py-20">
                    No categories found.
                </div>
            )}
        </div>
    )
}
