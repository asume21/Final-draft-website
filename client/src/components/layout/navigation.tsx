import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Code, Music, Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/code-translator", label: "Code Translator", icon: Code },
    { href: "/lyric-lab", label: "Lyric Lab", icon: Music },
    { href: "/beat-studio", label: "Beat Studio", icon: Music },
    { href: "/music-studio", label: "Music Studio", icon: Music },
    { href: "/codebeat-studio", label: "CodeBeat", icon: Zap },
    { href: "/ai-assistant", label: "AI Assistant", icon: null },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #334155', zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          {/* Logo and Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code style={{ color: 'white', width: '20px', height: '20px' }} />
              </div>
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '24px', height: '24px', background: 'linear-gradient(135deg, #06b6d4, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Music style={{ color: 'white', width: '12px', height: '12px' }} />
              </div>
            </div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                <span style={{ color: '#c084fc' }}>Coded</span>
                <span style={{ color: '#f472b6' }}>Switch</span>
              </h1>
              <p style={{ fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace', margin: 0 }}>Where Code Meets Music</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.slice(1, -1).map((item) => (
              <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                <span style={{ 
                  fontSize: '14px', 
                  color: isActive(item.href) ? '#f1f5f9' : '#94a3b8',
                  transition: 'color 0.2s'
                }}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/ai-assistant" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'transparent', border: 'none', color: '#f1f5f9', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
                AI Assistant
              </button>
            </Link>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
              <button style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}>
                Dashboard
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-github-border">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div 
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href) 
                        ? "bg-github-secondary text-github-text" 
                        : "text-github-text-secondary hover:text-github-text hover:bg-github-secondary/50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
