"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { slugify } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getCategories() {
    return await prisma.category.findMany({
        orderBy: { name: "asc" },
    })
}

export async function createPost(data: {
    title: string
    content: string
    slug?: string
    categoryId?: string
    excerpt?: string
    featuredImage?: string
    tags?: string[]
    published?: boolean
}) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const slug = data.slug || slugify(data.title) + "-" + Date.now().toString().slice(-4)

    const post = await prisma.post.create({
        data: {
            title: data.title,
            content: data.content,
            slug,
            excerpt: data.excerpt,
            featuredImage: data.featuredImage,
            categoryId: data.categoryId,
            published: false, // Always false initially
            approvalStatus: "PENDING",
            authorId: session.user.id,
            tags: data.tags ? {
                connectOrCreate: data.tags.map(tag => ({
                    where: { name: tag },
                    create: {
                        name: tag,
                        slug: slugify(tag)
                    }
                }))
            } : undefined
        },
    })

    revalidatePath("/dashboard/posts")
    return post
}

export async function updatePost(
    id: string,
    data: {
        title?: string
        content?: string
        slug?: string
        categoryId?: string
        excerpt?: string
        featuredImage?: string
        tags?: string[]
        published?: boolean
    }
) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const post = await prisma.post.findUnique({
        where: { id },
        include: { tags: true }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    // Handle tags update if provided
    let tagsUpdate = undefined
    if (data.tags) {
        // Disconnect all existing tags and connect new ones
        // This is a simple strategy; for more complex scenarios we might want to diff
        tagsUpdate = {
            set: [], // Disconnect all
            connectOrCreate: data.tags.map(tag => ({
                where: { name: tag },
                create: {
                    name: tag,
                    slug: slugify(tag)
                }
            }))
        }
    }

    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            ...data,
            slug: data.slug || (data.title ? slugify(data.title) + "-" + Date.now().toString().slice(-4) : undefined),
            tags: tagsUpdate
        },
    })

    revalidatePath("/dashboard/posts")
    revalidatePath(`/blog/${updatedPost.slug}`)
    return updatedPost
}

export async function deletePost(id: string) {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const post = await prisma.post.findUnique({
        where: { id },
    })

    if (!post) {
        throw new Error("Post not found")
    }

    if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    await prisma.post.delete({
        where: { id },
    })

    revalidatePath("/dashboard/posts")
}

export async function updatePostStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING") {
    const session = await getServerSession(authOptions)

    if (!session || !session.user || session.user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    const post = await prisma.post.update({
        where: { id },
        data: {
            approvalStatus: status,
            published: status === "APPROVED" // Auto-publish if approved
        }
    })

    revalidatePath("/admin/posts")
    revalidatePath("/blog")
    return post
}
