import Link from "next/link"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true, image: true },
      },
      category: true,
    },
    take: 6,
  })

  const createLink = session
    ? "/dashboard/posts/new"
    : `/login?callbackUrl=${encodeURIComponent("/dashboard/posts/new")}`

  return (
    <div className="container flex flex-col gap-16 py-16 md:py-24">
      <section className="flex flex-col items-center justify-center gap-6 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            AI-powered publishing
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Launch a world-class blog with AI copilots
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            BlogForge AI combines Next.js, shadcn/ui, Prisma, and powerful AI tooling to help you
            ideate, write, optimize, and publish in minutes.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={createLink}>
            <Button size="lg">Create a post</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="lg">
              Browse blog
            </Button>
          </Link>
          {!session && (
            <>
              <Link href="/signup">
                <Button variant="ghost" size="lg">
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="lg">
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Latest posts</h2>
            <p className="text-sm text-muted-foreground">Fresh stories from authors across the platform.</p>
          </div>
          <Link href="/blog">
            <Button variant="secondary">View all</Button>
          </Link>
        </div>
        {posts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post.id} className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md">
                {post.featuredImage && (
                  <div className="aspect-video w-full overflow-hidden bg-muted relative">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {post.category && (
                      <span className="font-medium text-primary">{post.category.name}</span>
                    )}
                    <span>•</span>
                    <span>{format(post.createdAt, "MMM d, yyyy")}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground flex-1">
                    {post.excerpt ?? "No summary available."}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {post.author.image && (
                        <Image src={post.author.image} alt={post.author.name || "Author"} width={24} height={24} className="rounded-full" />
                      )}
                      <span className="text-muted-foreground">{post.author.name}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
            No posts published yet. Be the first to share your ideas!
          </div>
        )}
      </section>
    </div>
  )
}
