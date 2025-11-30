"use server"

import OpenAI from "openai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export async function generateBlogContent(topic: string) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error("Unauthorized")
    }

    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API Key not configured")
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are an expert blog writer. Generate a comprehensive, SEO-optimized blog post in HTML format based on the given topic. Include headings, paragraphs, and lists. Do not include the title in the HTML body, just the content.",
            },
            {
                role: "user",
                content: `Write a blog post about: ${topic}`,
            },
        ],
    })

    return response.choices[0].message.content || ""
}

export async function generateBlogIdeas() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return { success: false, error: "Unauthorized" }
    }

    if (!process.env.OPENAI_API_KEY) {
        return { success: false, error: "OpenAI API Key not configured" }
    }

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content:
                        "You are a creative blog strategist. Generate 10 unique and engaging blog post ideas. Return them as a JSON array of strings.",
                },
                {
                    role: "user",
                    content: "Generate blog ideas.",
                },
            ],
            response_format: { type: "json_object" },
        })

        const content = response.choices[0].message.content || "{ \"ideas\": [] }"
        const json = JSON.parse(content)
        return { success: true, data: json.ideas || [] }
    } catch (error: any) {
        console.error("AI Error:", error)
        if (error?.status === 429) {
            return { success: false, error: "You have exceeded your AI usage quota. Please check your plan or try again later." }
        }
        return { success: false, error: "Failed to generate ideas. Please try again." }
    }
}

export async function editBlogContent(text: string, instruction: string) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error("Unauthorized")
    }

    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API Key not configured")
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are an expert editor. Edit the provided text based on the user's instruction. Return only the edited text, no explanations.",
            },
            {
                role: "user",
                content: `Text: "${text}"\n\nInstruction: ${instruction}`,
            },
        ],
    })

    return response.choices[0].message.content || text
}

export async function generateSEOMetadata(content: string) {
    const session = await getServerSession(authOptions)

    if (!session) {
        throw new Error("Unauthorized")
    }

    if (!process.env.OPENAI_API_KEY) {
        throw new Error("OpenAI API Key not configured")
    }

    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    "You are an SEO expert. Analyze the blog content and generate SEO metadata. Return a JSON object with: title (max 60 chars), description (max 160 chars), keywords (array of strings), and slug (URL friendly).",
            },
            {
                role: "user",
                content: `Content: "${content.substring(0, 2000)}..."`, // Limit context
            },
        ],
        response_format: { type: "json_object" },
    })

    const result = response.choices[0].message.content || "{}"
    return JSON.parse(result)
}

