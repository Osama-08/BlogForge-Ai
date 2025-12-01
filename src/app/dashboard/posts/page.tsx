import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PostActions } from "@/features/blog/components/post-actions"
import { redirect } from "next/navigation"

export default async function PostsPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/api/auth/signin")
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: session.user.role === "ADMIN" ? undefined : session.user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
        },
    })

    return (
        <div className="container py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Posts</h1>
                <Link href="/dashboard/posts/new">
                    <Button>Create New Post</Button>
                </Link>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post: any) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>
                                    {post.published ? (
                                        <span className="text-green-600 font-medium">Published</span>
                                    ) : (
                                        <span className="text-yellow-600 font-medium">Draft</span>
                                    )}
                                </TableCell>
                                <TableCell>{post.author.name || post.author.email}</TableCell>
                                <TableCell>
                                    {new Date(post.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <PostActions postId={post.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                        {posts.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10">
                                    No posts found. Create your first post!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
