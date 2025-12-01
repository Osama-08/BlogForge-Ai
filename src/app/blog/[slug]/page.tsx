import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type BlogPostPageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true } },
      tags: { select: { id: true, name: true } },
    },
  })

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="w-full px-4 md:px-8 space-y-6 py-16">
      <div className="space-y-4 text-center">
        <p className="text-sm text-muted-foreground">
          {format(post.createdAt, "MMM d, yyyy")} · {post.category?.name ?? "Uncategorized"}
        </p>
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>By {post.author?.name ?? "Unknown author"}</span>
          {post.tags.map((tag: { id: string; name: string }) => (
            <span key={tag.id} className="rounded-full border px-3 py-0.5 text-xs">
              {tag.name}
            </span>
          ))}
        </div>
      </div>
      {post.featuredImage ? (
        <div className="relative h-[360px] w-full overflow-hidden rounded-3xl border">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="prose prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/blog">← Back to blog</Link>
        </Button>
      </div>
    </article>
  )
}
