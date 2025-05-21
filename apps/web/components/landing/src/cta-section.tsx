import { Button } from '@repo/ui/button';
import { AnimatedWrapper } from '../../shared/animated-wrapper';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <section id="cta" className="py-16 md:py-24 bg-gradient-to-b from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper animationType="fadeInUp" className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ready to Dive In?
          </h2>
          <p className="mt-4 text-lg md:text-xl opacity-90">
            Join thousands of users who trust Kraken Wallet for their crypto journey. Secure, intuitive, and powerful – get started today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className=" flex bg-black  text-white p-4 hover:bg-background/80 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Link href="#">
                <Download className="mr-2 h-5 w-5" /> Download Wallet
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/50 bg-black p-4 text-white flex hover:bg-primary-foreground/10 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
               <Link href="#">
                Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
