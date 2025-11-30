import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LayoutDashboard, FileText, Settings, Users, Lightbulb } from "lucide-react"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`)
    }

    return (
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-10">
            <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
                <div className="h-full py-6 pl-8 pr-6 lg:py-8">
                    <div className="w-full">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/dashboard"
                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                            >
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                <span>Overview</span>
                            </Link>
                            <Link
                                href="/dashboard/posts"
                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Posts</span>
                            </Link>
                            <Link
                                href="/dashboard/ideas"
                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                            >
                                <Lightbulb className="mr-2 h-4 w-4" />
                                <span>Ideas</span>
                            </Link>
                            {session.user.role === "ADMIN" && (
                                <Link
                                    href="/dashboard/users"
                                    className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Users</span>
                                </Link>
                            )}
                            <Link
                                href="/dashboard/settings"
                                className="group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:bg-muted hover:text-foreground"
                            >
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex w-full flex-col overflow-hidden">{children}</main>
        </div>
    )
}
