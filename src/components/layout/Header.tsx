import Link from "next/link";

type HeaderProps = {
  children: React.ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full h-[64px] relative flex flex-row justify-center items-center gap-24">
      <Link href="/" className="absolute left-0">
        <h1 className="logo font-extrabold text-blue-500">RW.</h1>
      </Link>

      {children}
    </header>
  );
};

export default Header;
