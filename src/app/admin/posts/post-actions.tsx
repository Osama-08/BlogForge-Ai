"use client"

import { Button } from "@/components/ui/button"
import { updatePostStatus } from "@/features/blog/actions"
import { CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"
import { useTransition } from "react"

interface PostActionsProps {
    postId: string
}

export function PostActions({ postId }: PostActionsProps) {
    const [isPending, startTransition] = useTransition()

    const handleAction = (status: "APPROVED" | "REJECTED") => {
        startTransition(async () => {
            try {
                await updatePostStatus(postId, status)
                toast.success(`Post ${status.toLowerCase()} successfully`)
            } catch (error) {
                toast.error("Failed to update post status")
            }
        })
    }

    return (
        <div className="flex justify-end gap-2">
            <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                onClick={() => handleAction("APPROVED")}
                disabled={isPending}
            >
                <CheckCircle className="h-4 w-4" />
                <span className="sr-only">Approve</span>
            </Button>
            <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => handleAction("REJECTED")}
                disabled={isPending}
            >
                <XCircle className="h-4 w-4" />
                <span className="sr-only">Reject</span>
            </Button>
        </div>
    )
}
