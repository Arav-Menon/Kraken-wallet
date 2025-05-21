import { Card, CardContent, CardHeader, CardTitle } from '../../../../../packages/ui/src/card';
import { AnimatedWrapper } from '../../shared/animated-wrapper';
import { Coins, CandlestickChart, GalleryThumbnails, Link2, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  bgColorClass: string;
  iconColorClass: string;
}

const features: Feature[] = [
  {
    icon: Coins,
    title: 'Multi-Currency Support',
    description: 'Manage a diverse portfolio of cryptocurrencies all in one secure place.',
    bgColorClass: 'bg-primary/10',
    iconColorClass: 'text-primary',
  },
  {
    icon: CandlestickChart,
    title: 'Seamless Trading',
    description: 'Execute trades swiftly and efficiently directly within your wallet interface.',
    bgColorClass: 'bg-accent/10',
    iconColorClass: 'text-accent',
  },
  {
    icon: GalleryThumbnails,
    title: 'NFT Management',
    description: 'Beautifully showcase, manage, and trade your unique NFT collection.',
    bgColorClass: 'bg-green-500/10',
    iconColorClass: 'text-green-500',
  },
  {
    icon: Link2,
    title: 'DeFi Access',
    description: 'Connect to the world of decentralized finance applications with ease and security.',
    bgColorClass: 'bg-purple-500/10',
    iconColorClass: 'text-purple-500',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper animationType="fadeInUp" className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Packed with <span className="text-primary">Powerful Features</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Kraken Wallet is designed to provide a comprehensive and user-friendly crypto experience.
          </p>
        </AnimatedWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <AnimatedWrapper
              key={feature.title}
              animationType="fadeInUp"
              delay={index * 0.15}
              className="h-full"
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-border hover:border-primary flex flex-col">
                <CardHeader className="flex flex-row items-center space-x-4 pb-4">
                  <div className={`p-3 rounded-full ${feature.bgColorClass}`}>
                    <feature.icon className={`h-6 w-6 ${feature.iconColorClass}`} aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
