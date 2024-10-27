import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          pcmi
        </Link>
        <div className="flex-grow min-w-[150px]"> {/* Adjust the minimum width as needed */}
          <SearchField className="w-full" /> {/* Make the search bar take the full width */}
        </div>
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}