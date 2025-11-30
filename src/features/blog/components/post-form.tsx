"use client"

import { useTransition, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { Post, Category } from "@prisma/client"
import { slugify } from "@/lib/utils"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Editor } from "@/components/editor/editor"
import { createPost, updatePost, getCategories } from "../actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AIGenerator } from "./ai-generator"
import { SEOAssistant } from "./seo-assistant"
import { FileUpload } from "@/components/file-upload"

const postSchema = z.object({
    title: z.string().min(1, "Title is required"),
    slug: z.string().min(1, "Slug is required"),
    content: z.string().min(1, "Content is required"),
    excerpt: z.string().optional(),
    categoryId: z.string().optional(),
    tags: z.string().optional(), // Comma separated string for input
})

type PostFormValues = z.infer<typeof postSchema>

type Props = {
    post?: Post & { tags?: { name: string }[] }
}

export function PostForm({ post }: Props) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        getCategories().then(setCategories)
    }, [])

    const form = useForm<PostFormValues>({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            excerpt: post?.excerpt || "",
            categoryId: post?.categoryId || undefined,
            tags: post?.tags?.map(t => t.name).join(", ") || "",
        },
    })

    // Auto-generate slug from title if slug is empty
    const title = form.watch("title")
    useEffect(() => {
        if (title && !form.getValues("slug") && !post) {
            form.setValue("slug", slugify(title))
        }
    }, [title, form, post])

    function onSubmit(data: PostFormValues) {
        startTransition(async () => {
            try {
                const tagsList = data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : undefined

                if (post) {
                    await updatePost(post.id, {
                        ...data,
                        tags: tagsList
                    })
                    toast.success("Post updated successfully!")
                } else {
                    await createPost({
                        ...data,
                        tags: tagsList
                    })
                    toast.success("Post submitted for approval!")
                }
                router.push("/dashboard/posts")
                router.refresh()
            } catch (error) {
                console.error(error)
                toast.error("Something went wrong. Please try again.")
            }
        })
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>{post ? "Edit Post" : "Create New Post"}</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter post title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="slug"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Slug</FormLabel>
                                        <FormControl>
                                            <Input placeholder="post-url-slug" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            The URL-friendly version of the name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tags</FormLabel>
                                        <FormControl>
                                            <Input placeholder="AI, Tech, Next.js (comma separated)" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Short Summary</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A brief summary of your post..."
                                            className="resize-none h-20"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between mb-2">
                                        <FormLabel>Content</FormLabel>
                                        <div className="flex gap-2">
                                            <SEOAssistant
                                                content={field.value}
                                                onApply={(data) => {
                                                    form.setValue("title", data.title)
                                                    // We could also save the slug if we had a field for it
                                                }}
                                            />
                                            <AIGenerator
                                                onGenerate={(content) => {
                                                    form.setValue("content", content)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <FormControl>
                                        <Editor
                                            content={field.value}
                                            onChange={field.onChange}
                                            placeholder="Write your amazing post here..."
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-end">
                            <Button type="submit" disabled={isPending} size="lg" className="w-full sm:w-auto">
                                {isPending ? "Submitting..." : post ? "Update Post" : "Submit for Approval"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
