import { HeaderProps } from "@/lib/types";
import Link from "next/link";

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full h-[64px] relative flex flex-row justify-center items-center gap-24">
      <Link href="/" className="absolute left-0">
        <h1 className="logo font-bold text-sm bg-amber-200 p-4 rounded-sm">
          LO.
        </h1>
      </Link>

      {children}
    </header>
  );
};

export default Header;
