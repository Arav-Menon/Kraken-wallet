import { Button } from '../../../../../packages/ui/src/button';
import { AnimatedWrapper } from '../../shared/animated-wrapper';
import Image from 'next/image';
import { Rocket, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden bg-gradient-to-br from-background to-secondary">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center min-h-[60vh]">
                    <div className="max-w-3xl">
                        <AnimatedWrapper animationType="fadeInUp" delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                                The Future of Your <span className="text-primary">Crypto</span>, Secured.
                            </h1>
                        </AnimatedWrapper>
                        <AnimatedWrapper animationType="fadeInUp" delay={0.3}>
                            <p className="mt-6 text-lg md:text-xl text-muted-foreground">
                                Manage, trade, and grow your digital assets with Kraken Wallet – intuitive, secure, and powerful.
                            </p>
                        </AnimatedWrapper>
                        <AnimatedWrapper animationType="fadeInUp" delay={0.5} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="shadow-lg hover:shadow-xl bg-black text-white p-4 flex transform hover:scale-105 transition-all duration-300">
                                <Link href="#cta">
                                    <Rocket className="mr-2 h-5 w-5" /> Get Started For Free
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl bg-black text-white p-4 flex transform hover:scale-105 transition-all duration-300">
                                <Link href="#security">
                                    <ShieldCheck className="mr-2 h-5 w-5" /> Learn About Security
                                </Link>
                            </Button>
                        </AnimatedWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
}
