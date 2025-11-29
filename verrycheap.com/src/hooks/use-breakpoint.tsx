import { useState, useEffect } from "react";

export default function useBreakpoint() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsSmall(window.innerWidth >= 640);
    };

    checkBreakpoint();
    window.addEventListener("resize", checkBreakpoint);

    return () => {
      window.removeEventListener("resize", checkBreakpoint);
    };
  }, []);

  return isSmall;
}
