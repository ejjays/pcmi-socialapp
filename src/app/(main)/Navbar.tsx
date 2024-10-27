import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-3"> {/* Adjust spacing and alignment */}
        <Link href="/" className="text-2xl font-bold text-primary">
          bugbook
        </Link>
        <div className="flex-grow"> {/* Allow search field to grow */}
          <SearchField /> {/* Keep SearchField inside a container to control width */}
        </div>
        <UserButton className="flex-shrink-0" /> {/* Prevent UserButton from shrinking */}
      </div>
    </header>
  );
}