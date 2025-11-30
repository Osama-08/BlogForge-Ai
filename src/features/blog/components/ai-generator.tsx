"use client"

import { useState, useTransition } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { generateBlogContent } from "@/features/ai/actions"

type Props = {
    onGenerate: (content: string) => void
}

export function AIGenerator({ onGenerate }: Props) {
    const [open, setOpen] = useState(false)
    const [topic, setTopic] = useState("")
    const [isPending, startTransition] = useTransition()

    function handleGenerate() {
        if (!topic) return

        startTransition(async () => {
            try {
                const content = await generateBlogContent(topic)
                onGenerate(content)
                setOpen(false)
            } catch (error) {
                console.error(error)
                alert("Failed to generate content. Check your API key.")
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Generate with AI
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Generate Blog Post</DialogTitle>
                    <DialogDescription>
                        Enter a topic and let AI write the post for you.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="topic" className="text-right">
                            Topic
                        </Label>
                        <Input
                            id="topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="col-span-3"
                            placeholder="e.g. The Future of AI"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleGenerate} disabled={isPending}>
                        {isPending ? "Generating..." : "Generate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
