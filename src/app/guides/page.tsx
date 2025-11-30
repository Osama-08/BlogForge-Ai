import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function GuidesPage() {
    return (
        <div className="container py-16 md:py-24 text-center space-y-8">
            <h1 className="text-4xl font-bold">Guides</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                In-depth guides to help you master content creation.
            </p>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                <div className="p-6 border rounded-xl">
                    <h3 className="text-xl font-bold mb-2">SEO Best Practices</h3>
                    <p className="text-muted-foreground mb-4">Learn how to optimize your content for search engines using our tools.</p>
                    <Button variant="outline" size="sm">Read Guide</Button>
                </div>
                <div className="p-6 border rounded-xl">
                    <h3 className="text-xl font-bold mb-2">Writing Viral Content</h3>
                    <p className="text-muted-foreground mb-4">Tips and tricks for creating content that gets shared.</p>
                    <Button variant="outline" size="sm">Read Guide</Button>
                </div>
            </div>
            <p className="text-muted-foreground pt-8">More guides coming soon.</p>
            <Button variant="link" asChild><Link href="/">Return Home</Link></Button>
        </div>
    )
}
