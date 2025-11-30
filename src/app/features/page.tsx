import { Button } from "@/components/ui/button"
import { Bot, PenTool, Search, Zap, BarChart, Globe } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
    return (
        <div className="container py-16 md:py-24 space-y-24">
            {/* Hero */}
            <section className="text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">Powerful Features for Modern Writers</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Everything you need to create, optimize, and publish content at scale.
                    Powered by advanced AI technology.
                </p>
            </section>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">AI Writing Assistant</h3>
                    <p className="text-muted-foreground">
                        Generate high-quality articles, blog posts, and social media content in seconds with our advanced AI.
                    </p>
                </div>
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <PenTool className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Smart Editor</h3>
                    <p className="text-muted-foreground">
                        A distraction-free editor with real-time suggestions for grammar, style, and tone improvements.
                    </p>
                </div>
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Search className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">SEO Optimization</h3>
                    <p className="text-muted-foreground">
                        Built-in SEO tools to help your content rank higher. Keyword analysis, meta descriptions, and more.
                    </p>
                </div>
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Idea Generator</h3>
                    <p className="text-muted-foreground">
                        Never run out of inspiration. Get endless topic ideas tailored to your niche and audience.
                    </p>
                </div>
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                        Track your content's performance with detailed analytics on views, engagement, and growth.
                    </p>
                </div>
                <div className="p-6 border rounded-2xl bg-card space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">Multi-Language Support</h3>
                    <p className="text-muted-foreground">
                        Translate and localize your content into 30+ languages to reach a global audience.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <section className="bg-muted/50 rounded-3xl p-12 text-center space-y-8">
                <h2 className="text-3xl font-bold">Ready to experience these features?</h2>
                <div className="flex justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg">Get Started for Free</Button>
                    </Link>
                    <Link href="/contact">
                        <Button size="lg" variant="outline">Contact Sales</Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
