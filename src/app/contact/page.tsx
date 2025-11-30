import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container py-16 md:py-24 space-y-16">
            {/* Header */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">Get in Touch</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Have questions about BlogForge AI? We&apos;re here to help. Chat with our team.
                </p>
            </section>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Contact Form */}
                <div className="bg-card border rounded-2xl p-8 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                                <Input id="first-name" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                                <Input id="last-name" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <Textarea
                                id="message"
                                placeholder="Tell us how we can help..."
                                className="min-h-[150px]"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                        </Button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-8 lg:pl-8">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">Contact Information</h3>
                        <p className="text-muted-foreground">
                            Fill out the form and our team will get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">Email</h4>
                                <p className="text-sm text-muted-foreground">support@blogforge.ai</p>
                                <p className="text-sm text-muted-foreground">sales@blogforge.ai</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">Phone</h4>
                                <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                                <p className="text-sm text-muted-foreground">Mon-Fri from 8am to 5pm</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">Office</h4>
                                <p className="text-sm text-muted-foreground">
                                    123 AI Boulevard<br />
                                    San Francisco, CA 94105
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Preview */}
                    <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                        <h4 className="font-semibold">Looking for support?</h4>
                        <p className="text-sm text-muted-foreground">
                            Check out our documentation and FAQ for quick answers to common questions.
                        </p>
                        <Button variant="outline" className="w-full">Visit Help Center</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
