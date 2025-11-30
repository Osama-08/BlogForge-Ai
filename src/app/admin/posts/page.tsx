import { prisma } from "@/lib/prisma"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { updatePostStatus } from "@/features/blog/actions"
import { CheckCircle, XCircle, Clock } from "lucide-react"
import { revalidatePath } from "next/cache"
import { PostActions } from "./post-actions"

export default async function AdminPostsPage() {
    const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: { name: true, email: true }
            }
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Manage Posts</h1>
                <p className="text-muted-foreground">
                    Review and manage all blog posts.
                </p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>
                                    <div className="flex flex-col">
                                        <span>{post.author.name}</span>
                                        <span className="text-xs text-muted-foreground">{post.author.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={
                                        post.approvalStatus === "APPROVED" ? "default" :
                                            post.approvalStatus === "REJECTED" ? "destructive" : "secondary"
                                    }>
                                        {post.approvalStatus}
                                    </Badge>
                                </TableCell>
                                <TableCell>{format(post.createdAt, "MMM d, yyyy")}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {post.approvalStatus === "PENDING" && (
                                            <PostActions postId={post.id} />
                                        )}
                                        {post.approvalStatus !== "PENDING" && (
                                            <span className="text-muted-foreground text-sm">
                                                {post.approvalStatus === "APPROVED" ? "Published" : "Rejected"}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
