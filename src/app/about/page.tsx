import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Rocket, Code2, Users, Heart } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="container py-16 md:py-24 space-y-24">
            {/* Hero Section */}
            <section className="flex flex-col items-center text-center space-y-6">
                <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
                    About BlogForge AI
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                    We are redefining the way content is created and consumed.
                    Powered by advanced AI, built for modern storytellers.
                </p>
            </section>

            {/* Mission Section */}
            <section className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Our Mission</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        At BlogForge AI, we believe that everyone has a story to tell, but not everyone has the time or technical skills to tell it perfectly.
                        Our mission is to democratize high-quality content creation by providing intelligent tools that assist with ideation, writing, and optimization.
                    </p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-primary" />
                            <span className="font-medium">Innovation</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-primary" />
                            <span className="font-medium">Passion</span>
                        </div>
                    </div>
                </div>
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
                    <Image
                        src="/about-mission.png"
                        alt="BlogForge AI Mission"
                        fill
                        className="object-cover"
                    />
                </div>
            </section>

            {/* Tech Stack Section */}
            <section className="space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">Built with Modern Tech</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        We leverage the latest and greatest technologies to ensure speed, security, and scalability.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-xl bg-card">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Code2 className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-xl">Next.js 15</h3>
                        <p className="text-sm text-muted-foreground">The React Framework for the Web, providing server-side rendering and static generation.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-xl bg-card">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-xl">Prisma</h3>
                        <p className="text-sm text-muted-foreground">Next-generation Node.js and TypeScript ORM for our PostgreSQL database.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-xl bg-card">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-xl">OpenAI</h3>
                        <p className="text-sm text-muted-foreground">Powering our intelligent writing assistants and idea generators.</p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-6 border rounded-xl bg-card">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Heart className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-xl">Tailwind CSS</h3>
                        <p className="text-sm text-muted-foreground">A utility-first CSS framework for rapid UI development and design.</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary text-primary-foreground rounded-3xl p-12 text-center space-y-8">
                <h2 className="text-3xl font-bold">Ready to start your journey?</h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                    Join thousands of writers who are using BlogForge AI to share their voice with the world.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/signup">
                        <Button size="lg" variant="secondary" className="font-semibold">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/blog">
                        <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10 text-primary-foreground">
                            Read the Blog
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
