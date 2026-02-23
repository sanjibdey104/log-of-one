import { LayoutProps } from "@/lib/types";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container max-w-[98%] md:max-w-[60%] flex flex-col gap-24 p-16 mx-auto text-sm sm:text-base tracking-normal">
      <Header />

      {children}

      <Footer />
    </div>
  );
};

export default Layout;
