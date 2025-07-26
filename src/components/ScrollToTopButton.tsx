import { useEffect, useRef, useState } from "react";

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onPageScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setShow(window.scrollY > 200);
      }, 100);
    };

    window.addEventListener("scroll", onPageScroll);

    return () => window.removeEventListener("scroll", onPageScroll);
  }, []);

  const onScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <button
      className="w-[35px] h-[35px] fixed bottom-20 right-[2vw] md:right-[20%] bg-amber-200 rounded-full text-xs cursor-pointer"
      onClick={onScrollToTop}
    >
      Up
    </button>
  );
};

export default ScrollToTopButton;
