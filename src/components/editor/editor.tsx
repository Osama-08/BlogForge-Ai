"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import BubbleMenuExtension from "@tiptap/extension-bubble-menu"
import { Toolbar } from "./toolbar"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { editBlogContent } from "@/features/ai/actions"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
    content?: string
    onChange?: (content: string) => void
    placeholder?: string
}

export function Editor({ content = "", onChange, placeholder = "Write something..." }: Props) {
    const [isPending, startTransition] = useTransition()

    const editor = useEditor({
        extensions: [
            StarterKit,
            BubbleMenuExtension,
            Placeholder.configure({
                placeholder,
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none max-w-none min-h-[300px] p-4",
            },
        },
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML())
        },
        immediatelyRender: false,
    })

    const handleAIEdit = (instruction: string) => {
        if (!editor) return
        const { from, to } = editor.state.selection
        const text = editor.state.doc.textBetween(from, to)

        if (!text) return

        startTransition(async () => {
            try {
                const editedText = await editBlogContent(text, instruction)
                editor.chain().focus().insertContentAt({ from, to }, editedText).run()
            } catch (error) {
                console.error(error)
                alert("Failed to edit content.")
            }
        })
    }

    return (
        <div className="flex flex-col border rounded-md bg-background relative">
            <Toolbar editor={editor} />
            {/* BubbleMenu removed due to import issues. To be restored later. */}
            <EditorContent editor={editor} />
        </div>
    )
}
