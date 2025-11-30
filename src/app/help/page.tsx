import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
    return (
        <div className="container py-16 md:py-24 space-y-12">
            <section className="text-center space-y-6">
                <h1 className="text-4xl font-bold">Help Center</h1>
                <p className="text-xl text-muted-foreground">How can we help you today?</p>
                <div className="max-w-md mx-auto relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for help..." className="pl-10" />
                </div>
            </section>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border rounded-xl">
                    <h3 className="font-bold mb-2">Account & Billing</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:underline">Manage subscription</Link></li>
                        <li><Link href="#" className="hover:underline">Update payment method</Link></li>
                        <li><Link href="#" className="hover:underline">Reset password</Link></li>
                    </ul>
                </div>
                <div className="p-6 border rounded-xl">
                    <h3 className="font-bold mb-2">Using the Editor</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:underline">Keyboard shortcuts</Link></li>
                        <li><Link href="#" className="hover:underline">Formatting text</Link></li>
                        <li><Link href="#" className="hover:underline">Adding images</Link></li>
                    </ul>
                </div>
                <div className="p-6 border rounded-xl">
                    <h3 className="font-bold mb-2">AI Tools</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><Link href="#" className="hover:underline">Generating ideas</Link></li>
                        <li><Link href="#" className="hover:underline">SEO optimization</Link></li>
                        <li><Link href="#" className="hover:underline">Content rewriting</Link></li>
                    </ul>
                </div>
            </div>

            <div className="text-center pt-8">
                <p className="text-muted-foreground mb-4">Can't find what you're looking for?</p>
                <Button asChild><Link href="/contact">Contact Support</Link></Button>
            </div>
        </div>
    )
}
