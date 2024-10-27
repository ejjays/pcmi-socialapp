import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          pcmi
        </Link>
        <div className="flex-grow"> {/* This will allow the search bar to take up available space */}
          <SearchField className="w-full" /> {/* Ensure the search field takes full width of its container */}
        </div>
        <UserButton className="sm:ms-auto" /> {/* User button on the right */}
      </div>
    </header>
  );
}