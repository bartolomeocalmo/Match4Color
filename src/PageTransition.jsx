import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [fade, setFade] = useState("fade-in");

  useEffect(() => {
    setFade("fade-in");
    return () => setFade("fade-out");
  }, []);

  return <div className={fade}>{children}</div>;
}
