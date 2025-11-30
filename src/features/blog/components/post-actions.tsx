"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { deletePost } from "../actions"

type Props = {
    postId: string
}

export function PostActions({ postId }: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    function onDelete() {
        if (confirm("Are you sure you want to delete this post?")) {
            startTransition(async () => {
                await deletePost(postId)
                router.refresh()
            })
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/dashboard/posts/${postId}`)}
            >
                <Edit className="h-4 w-4" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                disabled={isPending}
                className="text-destructive hover:text-destructive"
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    )
}
