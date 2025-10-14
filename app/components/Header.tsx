"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Run on mount in case the page is already scrolled
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 pt-4 px-40 ${scrolled ? "bg-white/80 backdrop-blur-md" : "bg-transparent"}`}>
      <div className="w-full px-8 py-6 flex items-center">
        <img src="/church-logo.png" alt="Church Logo" className="h-16 w-auto" />
        <nav className="flex gap-8 mx-auto">
          <Link href="#about" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>About Us</Link>
          <Link href="#services" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>Service</Link>
          <Link href="#sermons" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>Sermon</Link>
          <Link href="#ministries" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>Ministries</Link>
          <Link href="#resources" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>Resources</Link>
          <Link href="#faq" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>FAQ</Link>
          <Link href="#give" className={`text-base font-medium hover:text-white/80 ${scrolled ? "text-[#B3583C]" : "text-white"}`}>Give</Link>
        </nav>

        {/* Language Switcher and Sign Up */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button className={`rounded-md px-3 py-1.5 text-base hover:bg-white/10 ${scrolled ? "text-[#4A5568]" : "text-white"}`}>
              华
            </button>
            <div className={`h-10 w-px ${scrolled ? "bg-[#4A5568]/30" : "bg-white/30"}`}></div>
            <button className={`rounded-md px-3 py-1.5 text-base hover:bg-white/10 ${scrolled ? "text-[#4A5568]" : "text-white"}`}>
              en
            </button>
          </div>
            <button className={`${scrolled ? "bg-[#1F2E41] text-[#FFFFFF] border border-[#1F2E41] hover:bg-[#2a3d55]" : "bg-white/50 text-white border border-white/30 hover:bg-white/60"} rounded-md px-4 py-2 transition-colors`}>
            Sign Up
            </button>
        </div>
      </div>
    </header>
  );
}
