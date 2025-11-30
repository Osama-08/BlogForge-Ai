"use client"

import { useState, useTransition } from "react"
import { Search } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { generateSEOMetadata } from "@/features/ai/actions"

type Props = {
    content: string
    onApply: (data: { title: string; slug: string }) => void
}

export function SEOAssistant({ content, onApply }: Props) {
    const [open, setOpen] = useState(false)
    const [metadata, setMetadata] = useState<{
        title: string
        description: string
        keywords: string[]
        slug: string
    } | null>(null)
    const [isPending, startTransition] = useTransition()

    function handleGenerate() {
        if (!content) return

        startTransition(async () => {
            try {
                const data = await generateSEOMetadata(content)
                setMetadata(data)
            } catch (error) {
                console.error(error)
                alert("Failed to generate SEO metadata.")
            }
        })
    }

    function handleApply() {
        if (metadata) {
            onApply({ title: metadata.title, slug: metadata.slug })
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Search className="h-4 w-4" />
                    SEO Assistant
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                    <DialogTitle>AI SEO Assistant</DialogTitle>
                    <DialogDescription>
                        Generate optimized metadata for your post.
                    </DialogDescription>
                </DialogHeader>

                {!metadata ? (
                    <div className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">
                            Analyze your content to generate SEO-friendly title, description, and slug.
                        </p>
                        <Button onClick={handleGenerate} disabled={isPending}>
                            {isPending ? "Analyzing..." : "Analyze Content"}
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="seo-title">Optimized Title</Label>
                            <Input id="seo-title" value={metadata.title} readOnly />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="seo-slug">Slug</Label>
                            <Input id="seo-slug" value={metadata.slug} readOnly />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="seo-desc">Meta Description</Label>
                            <Textarea id="seo-desc" value={metadata.description} readOnly className="h-20" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Keywords</Label>
                            <div className="flex flex-wrap gap-2">
                                {metadata.keywords.map((k, i) => (
                                    <span key={i} className="bg-secondary px-2 py-1 rounded-md text-xs">
                                        {k}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {metadata && (
                        <Button onClick={handleApply}>Apply to Post</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
