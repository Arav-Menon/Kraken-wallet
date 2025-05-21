"use client";
import Link from 'next/link';
import { Button } from '../../../../../packages/ui/src/button';
import Logo from '../../shared/logo';
import { AnimatedWrapper } from '../../shared/animated-wrapper';
import { Menu, X, UserPlus } from 'lucide-react';
import { useState, useEffect } from 'react';

const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    {children}
  </a>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#features', label: 'Features' },
    { href: '#security', label: 'Security' },
    { href: '#cta', label: 'Get Started' },
  ];

  return (
    <AnimatedWrapper
      animationType="fadeInUp"
      duration={0.5}
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled || isMenuOpen ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo textColorClassName={isScrolled || isMenuOpen ? "text-primary" : "text-primary"} />
            <nav className="hidden md:flex space-x-6 items-center">
              {navItems.map(item => <NavItem key={item.href} href={item.href}>{item.label}</NavItem>)}
              <Button asChild variant="default" size="sm" className='flex bg-black text-white p-3 hover:bg-black/85 ' >
                <Link href="/signin">
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </Link>
              </Button>
            </nav>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md shadow-lg">
            <nav className="px-4 pt-2 pb-4 space-y-3">
              {navItems.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {item.label}
                </a>
              ))}
              <Button
                asChild
                variant="default"
                className="w-full border border-black flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href="/signup">
                  <UserPlus className="mr-2 h-4 w-4" /> Create Account
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>
    </AnimatedWrapper>
  );
}
