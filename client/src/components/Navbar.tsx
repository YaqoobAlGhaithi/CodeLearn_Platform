import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { Menu, X, LogOut, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Title */}
        <Link href="/">
          <a className="flex items-center gap-3 font-bold text-xl text-primary hover:opacity-80 transition-opacity">
            {APP_LOGO && (
              <img
                src={APP_LOGO}
                alt={APP_TITLE}
                className="h-8 w-8 rounded-lg"
              />
            )}
            <span className="hidden sm:inline">{APP_TITLE}</span>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/courses">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              المسارات التعليمية
            </a>
          </Link>
          <Link href="/playground">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              ملعب الكود
            </a>
          </Link>
          <Link href="/about">
            <a className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              عن المنصة
            </a>
          </Link>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && user ? (
            <>
              <Link href="/dashboard">
                <a className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  لوحة التحكم
                </a>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                تسجيل الخروج
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              تسجيل الدخول
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-3">
            <Link href="/courses">
              <a className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                المسارات التعليمية
              </a>
            </Link>
            <Link href="/about">
              <a className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                عن المنصة
              </a>
            </Link>
              <Link href="/playground">
              <a className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                ملعب الكود
              </a>
            </Link>
            <div className="pt-2 border-t border-border space-y-2">
              {isAuthenticated && user ? (
                <>
                  <Link href="/dashboard">
                    <a className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors">
                      لوحة التحكم
                    </a>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => logout()}
                    className="w-full gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    تسجيل الخروج
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => (window.location.href = getLoginUrl())}
                  className="w-full"
                >
                  تسجيل الدخول
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
