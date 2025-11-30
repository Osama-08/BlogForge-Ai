import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PostForm } from "@/features/blog/components/post-form"

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: PageProps) {
    const session = await getServerSession(authOptions)
    const { id } = await params

    if (!session) {
        redirect("/api/auth/signin")
    }

    const post = await prisma.post.findUnique({
        where: { id },
    })

    if (!post) {
        notFound()
    }

    if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
        redirect("/dashboard/posts")
    }

    return (
        <div className="container py-10">
            <PostForm post={post} />
        </div>
    )
}
