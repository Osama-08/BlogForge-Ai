import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

export default async function BlogPage() {
  const session = await getServerSession(authOptions)
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      approvalStatus: "APPROVED"
    },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true },
      },
      tags: {
        select: { id: true, name: true },
      },
    },
  })

  const createLink = session
    ? "/dashboard/posts/new"
    : `/login?callbackUrl=${encodeURIComponent("/dashboard/posts/new")}`

  return (
    <div className="container space-y-10 py-16">
      <header className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">All blog posts</h1>
        <p className="text-muted-foreground">
          Explore featured stories, AI tips, and publishing workflows from the BlogForge AI community.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={createLink}>
            <Button>Create a post</Button>
          </Link>
          {!session && (
            <>
              <Link href="/signup">
                <Button variant="outline">Sign up</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {posts.length ? (
        <div className="grid gap-8 md:grid-cols-2">
          {posts.map((post) => (
            <article key={post.id} className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-lg">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{format(post.createdAt, "MMM d, yyyy")}</span>
                {post.category ? (
                  <>
                    <span>•</span>
                    <span>{post.category.name}</span>
                  </>
                ) : null}
              </div>
              <h2 className="mt-3 text-2xl font-semibold leading-tight">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 line-clamp-4 text-sm text-muted-foreground">{post.excerpt ?? post.content.slice(0, 180)}</p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span>By {post.author?.name ?? "Unknown author"}</span>
                {post.tags.map((tag) => (
                  <span key={tag.id} className="rounded-full border px-2 py-0.5 text-[11px]">
                    {tag.name}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-medium hover:underline">
                  Keep reading →
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No posts published yet. Sign in to create the first one!</p>
        </div>
      )}
    </div>
  )
}

