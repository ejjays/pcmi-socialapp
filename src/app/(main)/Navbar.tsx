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
        <div className="flex-grow max-w-lg"> {/* Set a max width for the search field */}
          <SearchField /> {/* Remove className for SearchField to avoid TypeScript error */}
        </div>
        <UserButton className="flex-shrink-0" /> {/* Prevent UserButton from shrinking */}
      </div>
    </header>
  );
}