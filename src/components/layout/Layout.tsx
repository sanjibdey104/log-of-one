type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container max-w-[95%] md:max-w-[60%] p-16 mx-auto text-sm sm:text-base leading-relaxed tracking-normal">
      {children}
    </div>
  );
};

export default Layout;
