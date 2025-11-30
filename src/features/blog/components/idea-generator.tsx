"use client"

import { useState, useTransition } from "react"
import { Lightbulb, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateBlogIdeas } from "@/features/ai/actions"
import { useRouter } from "next/navigation"

export function IdeaGenerator() {
    const [ideas, setIdeas] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    function handleGenerate() {
        setError(null)
        startTransition(async () => {
            try {
                const result = await generateBlogIdeas()
                if (result.success && result.data) {
                    setIdeas(result.data)
                } else {
                    setError(result.error || "Failed to generate ideas.")
                }
            } catch (error) {
                console.error(error)
                setError("An unexpected error occurred.")
            }
        })
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Blog Ideas</h2>
                <Button onClick={handleGenerate} disabled={isPending}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {isPending ? "Generating..." : "Generate Ideas"}
                </Button>
            </div>

            {error && (
                <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md border border-destructive/20 text-sm">
                    {error}
                </div>
            )}

            {ideas.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {ideas.map((idea, index) => (
                        <Card key={index} className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium leading-tight">
                                    {idea}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="w-full mt-2"
                                    onClick={() => router.push(`/dashboard/posts/new?title=${encodeURIComponent(idea)}`)}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Post
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                        <Lightbulb className="h-10 w-10 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">No ideas generated yet</h3>
                        <p className="mb-4 mt-2 text-sm text-muted-foreground">
                            Click the button above to generate unique blog post ideas using AI.
                        </p>
                        <Button onClick={handleGenerate} disabled={isPending}>
                            Generate Ideas
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
