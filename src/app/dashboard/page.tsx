import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return null
    }

    const isAdmin = session.user.role === "ADMIN"

    if (isAdmin) {
        const [totalPosts, totalUsers, totalComments, pendingPosts] = await Promise.all([
            prisma.post.count(),
            prisma.user.count(),
            prisma.comment.count(),
            prisma.post.count({ where: { published: false } }),
        ])

        return (
            <div className="flex flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold">Admin dashboard</h1>
                    <p className="text-muted-foreground">Monitor content, authors, and community activity.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Published posts" value={totalPosts.toString()} hint="Across all authors" />
                    <StatCard title="Pending drafts" value={pendingPosts.toString()} hint="Awaiting publication" />
                    <StatCard title="Registered users" value={totalUsers.toString()} hint="Across all roles" />
                    <StatCard title="Comments" value={totalComments.toString()} hint="Community feedback" />
                </div>
                <div className="rounded-2xl border p-6">
                    <h2 className="text-xl font-semibold">Manage the platform</h2>
                    <p className="text-sm text-muted-foreground">Jump into moderation, user management, or analytics.</p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <Button asChild>
                            <Link href="/dashboard/posts">Review posts</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/dashboard/users">Manage users</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/dashboard/settings">System settings</Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    const [publishedCount, draftCount] = await Promise.all([
        prisma.post.count({ where: { authorId: session.user.id, published: true } }),
        prisma.post.count({ where: { authorId: session.user.id, published: false } }),
    ])

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold">Creator dashboard</h1>
                <p className="text-muted-foreground">Track your publishing progress and draft new ideas.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Published posts" value={publishedCount.toString()} hint="Visible on the blog" />
                <StatCard title="Drafts" value={draftCount.toString()} hint="Waiting for final touches" />
                <StatCard title="Ideas brainstormed" value="∞" hint="Powered by AI assistants" />
                <StatCard title="Average feedback" value="Coming soon" hint="Engagement insights" />
            </div>
            <div className="rounded-2xl border p-6">
                <h2 className="text-xl font-semibold">Next actions</h2>
                <p className="text-sm text-muted-foreground">Jump back into writing or planning content.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild>
                        <Link href="/dashboard/posts/new">Create a post</Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/dashboard/posts">Manage posts</Link>
                    </Button>
                    <Button variant="ghost" asChild>
                        <Link href="/dashboard/ideas">Generate ideas</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{hint}</p>
            </CardContent>
        </Card>
    )
}
