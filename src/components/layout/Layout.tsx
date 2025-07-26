import { LayoutProps } from "@/lib/types";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container max-w-[98%] md:max-w-[60%] p-16 mx-auto text-sm sm:text-base tracking-normal">
      {children}
    </div>
  );
};

export default Layout;
