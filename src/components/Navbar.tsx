"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close drawer on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleMobileNavClick = (href: string) => {
    setMenuOpen(false);
    if (pathname === href) router.refresh();
  };

  const handleDesktopNavClick = (href: string) => {
    if (pathname === href) router.refresh();
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          background: scrolled
            ? "rgba(255,255,255,0.90)"
            : "rgba(255,255,255,0.70)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(0,0,0,0.07)"
            : "1px solid transparent",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <nav
          className="container flex justify-between items-center"
          style={{ height: "76px" }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none" }}
            aria-label="Medialooptech Home"
          >
            <span
              style={{
                fontFamily: "Hanken Grotesk, sans-serif",
                fontSize: "22px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                color: "#000",
              }}
            >
              MEDIA
              <span style={{ color: "var(--brand-magenta)" }}>LOOP</span>
              <span style={{ color: "#000" }}>TECH</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul
            className="flex gap-8 mobile-hidden"
            style={{ listStyle: "none" }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="label-sm"
                    onClick={() => handleDesktopNavClick(link.href)}
                    style={{
                      color: active ? "#000" : "#888",
                      textDecoration: "none",
                      transition: "color 0.2s",
                      borderBottom: active
                        ? "2px solid var(--brand-magenta)"
                        : "2px solid transparent",
                      paddingBottom: "2px",
                    }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="btn-primary mobile-hidden"
              style={{ padding: "11px 24px", fontSize: "13px" }}
            >
              Get In Touch
            </Link>
            <button
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "none",
              }}
              className="hamburger-btn"
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(255,255,255,0.98)",
          backdropFilter: "blur(24px)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
          paddingTop: "80px",
        }}
      >
        {navLinks.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => handleMobileNavClick(link.href)}
            style={{
              fontFamily: "Hanken Grotesk, sans-serif",
              fontSize: "36px",
              fontWeight: 800,
              color: pathname === link.href ? "var(--brand-magenta)" : "#000",
              textDecoration: "none",
              letterSpacing: "-0.03em",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ease ${i * 0.06}s, transform 0.4s ease ${i * 0.06}s`,
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="btn-magenta btn-primary"
          onClick={() => handleMobileNavClick("/contact")}
          style={{ marginTop: "16px" }}
        >
          Start a Project →
        </Link>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .hamburger-btn { display: block !important; }
          .mobile-hidden { display: none !important; }
        }
      `}</style>
    </>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 22, height: 16, position: "relative" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            height: "2px",
            background: "#000",
            borderRadius: "1px",
            transition: "all 0.3s ease",
            top: i === 0 ? 0 : i === 1 ? "7px" : "14px",
            opacity: open && i === 1 ? 0 : 1,
            transform:
              open && i === 0
                ? "translateY(7px) rotate(45deg)"
                : open && i === 2
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
          }}
        />
      ))}
    </div>
  );
}
