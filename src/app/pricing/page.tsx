import { Button } from "@/components/ui/button"
import { Check, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
    return (
        <div className="container py-16 md:py-24 space-y-16">
            {/* Header */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">Simple, Transparent Pricing</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose the plan that&apos;s right for you. No hidden fees. Cancel anytime.
                </p>
            </section>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Starter Plan */}
                <div className="flex flex-col p-6 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold">Starter</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <p className="text-muted-foreground">Perfect for trying out BlogForge AI.</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">5 AI-generated posts/mo</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">Basic SEO optimization</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">Standard support</span>
                        </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/signup">Get Started</Link>
                    </Button>
                </div>

                {/* Pro Plan */}
                <div className="flex flex-col p-6 bg-primary text-primary-foreground rounded-2xl shadow-lg scale-105 relative">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-background text-primary px-3 py-1 rounded-full text-sm font-semibold border shadow-sm">
                        Most Popular
                    </div>
                    <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold">Pro</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$29</span>
                            <span className="text-primary-foreground/80">/month</span>
                        </div>
                        <p className="text-primary-foreground/80">For serious content creators.</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            <span className="text-sm">Unlimited AI posts</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Advanced SEO tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Priority support</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Custom brand voice</span>
                        </li>
                    </ul>
                    <Button variant="secondary" className="w-full font-semibold" asChild>
                        <Link href="/signup?plan=pro">Get Pro</Link>
                    </Button>
                </div>

                {/* Enterprise Plan */}
                <div className="flex flex-col p-6 bg-card border rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-4 mb-8">
                        <h3 className="text-2xl font-bold">Enterprise</h3>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-bold">$99</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <p className="text-muted-foreground">For teams and agencies.</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">Everything in Pro</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">Team collaboration</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">API access</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">Dedicated account manager</span>
                        </li>
                    </ul>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/contact">Contact Sales</Link>
                    </Button>
                </div>
            </div>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto space-y-8 pt-12">
                <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Can I cancel my subscription?</h3>
                        <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">Do you offer a free trial?</h3>
                        <p className="text-muted-foreground">We offer a 14-day free trial for our Pro plan. No credit card required to start.</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold text-lg">What payment methods do you accept?</h3>
                        <p className="text-muted-foreground">We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.</p>
                    </div>
                </div>
            </section>
        </div>
    )
}
