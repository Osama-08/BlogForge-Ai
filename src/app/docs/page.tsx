import { Button } from "@/components/ui/button"
import { Book, FileText, Terminal } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
    return (
        <div className="container py-16 md:py-24 space-y-12">
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Learn how to integrate and use BlogForge AI in your workflow.
                </p>
            </section>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="p-6 border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <Book className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Getting Started</h3>
                    <p className="text-muted-foreground">Quick start guide to setting up your account and first blog.</p>
                </div>
                <div className="p-6 border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <Terminal className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">API Reference</h3>
                    <p className="text-muted-foreground">Detailed API documentation for developers.</p>
                </div>
                <div className="p-6 border rounded-xl hover:border-primary transition-colors cursor-pointer">
                    <FileText className="h-8 w-8 mb-4 text-primary" />
                    <h3 className="text-xl font-bold mb-2">Guides & Tutorials</h3>
                    <p className="text-muted-foreground">Step-by-step guides for common tasks and features.</p>
                </div>
            </div>

            <div className="text-center">
                <p className="text-muted-foreground">This is a placeholder for the full documentation site.</p>
                <Button variant="link" asChild><Link href="/">Return Home</Link></Button>
            </div>
        </div>
    )
}
