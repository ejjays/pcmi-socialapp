"use client"; // Add this line at the top

import { useEffect, useState, useCallback } from "react";
import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    if (currentScrollY > lastScrollY) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);

    setScrollTimeout(setTimeout(() => {
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
    }, 100)); // Adjust duration as needed
  }, [lastScrollY]); // Only include lastScrollY here

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [handleScroll, scrollTimeout]); // Add scrollTimeout to the dependency array

  return (
    <header className={`sticky top-0 z-10 bg-card shadow-sm transition-transform duration-120 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          pcmi
        </Link>
        <div className="flex-grow max-w-lg">
          <SearchField />
        </div>
        <UserButton className="flex-shrink-0" />
      </div>
    </header>
  );
}
