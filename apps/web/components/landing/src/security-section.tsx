import { Card, CardContent, CardHeader, CardTitle } from '../../../../../packages/ui/src/card';
import { AnimatedWrapper } from '../../shared/animated-wrapper';
import Image from 'next/image';
import { ShieldCheck, Fingerprint, Verified, LockKeyhole } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface SecurityFeature {
    icon: LucideIcon;
    title: string;
    description: string;
}

const securityFeatures: SecurityFeature[] = [
    {
        icon: ShieldCheck,
        title: 'Advanced Encryption',
        description: 'Your private keys are protected with state-of-the-art encryption algorithms, ensuring they never leave your device.',
    },
    {
        icon: Fingerprint,
        title: 'Biometric Authentication',
        description: 'Secure your wallet with fingerprint or Face ID, adding an extra layer of protection against unauthorized access.',
    },
    {
        icon: Verified,
        title: 'Regular Security Audits',
        description: 'Our codebase undergoes rigorous independent security audits to identify and address potential vulnerabilities proactively.',
    },
    {
        icon: LockKeyhole,
        title: 'Non-Custodial Control',
        description: 'You have full control over your private keys and assets. We never have access to your funds.',
    },
];

export default function SecuritySection() {
    return (
        <section id="security" className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <AnimatedWrapper animationType="slideInLeft" className="order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                            Your Security, Our <span className="text-primary">Utmost Priority</span>
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We employ cutting-edge security measures to protect your digital assets. With Kraken Wallet, you're in control.
                        </p>
                        <div className="mt-8 space-y-6">
                            {securityFeatures.map((feature, index) => (
                                <AnimatedWrapper key={feature.title} animationType="fadeInUp" delay={index * 0.15}>
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full">
                                            <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                                            <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </AnimatedWrapper>
                    <AnimatedWrapper animationType="slideInRight" className="order-1 lg:order-2">
                        <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
                            <Image
                                src="/images/wallet-showcase.png"
                                alt="Kraken Wallet App Showcase"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-xl shadow-2xl"
                                data-ai-hint="crypto wallet app"
                                priority
                            />
                        </div>
                    </AnimatedWrapper>
                </div>
            </div>
        </section>
    );
}
