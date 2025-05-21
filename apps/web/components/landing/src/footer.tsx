import Logo from '../../shared/logo';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="flex justify-center md:justify-start">
            <Logo textColorClassName="text-muted-foreground" iconSize={6} textSize="text-xl" />
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:col-span-1">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#security" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Security
            </Link>
          </nav>

          <div className="flex justify-center md:justify-end space-x-4">
            <Link href="#" aria-label="Kraken Wallet on Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Kraken Wallet on Github" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Kraken Wallet on LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          &copy; {currentYear} Kraken Wallet. All rights reserved. Built with passion.
        </div>
      </div>
    </footer>
  );
}
