"use client"

import { UploadDropzone } from "@uploadthing/react"
import { OurFileRouter } from "@/app/api/uploadthing/core"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
    endpoint: keyof OurFileRouter
    value: string
    onChange: (url?: string) => void
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
    if (value) {
        return (
            <div className="relative h-48 w-full overflow-hidden rounded-md border">
                <Image
                    fill
                    src={value}
                    alt="Upload"
                    className="object-cover"
                />
                <Button
                    onClick={() => onChange("")}
                    className="absolute right-2 top-2 h-8 w-8 rounded-full bg-rose-500 p-0 text-white shadow-sm hover:bg-rose-600"
                    type="button"
                    variant="ghost"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>
        )
    }

    return (
        <UploadDropzone<OurFileRouter, typeof endpoint>
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }}
            onUploadError={(error: Error) => {
                console.log(error)
                alert(`ERROR! ${error.message}`)
            }}
            className="w-full border-dashed border-2 border-gray-300 rounded-lg p-4 hover:bg-gray-50/50 transition h-48 flex items-center justify-center ut-label:text-sm ut-button:bg-primary ut-button:text-primary-foreground ut-button:hover:bg-primary/90"
        />
    )
}
