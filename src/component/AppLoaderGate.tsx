import { useEffect, useState } from "react";
import ClassicProLoader from "./SiteLoader";

export default function AppLoaderGate({
  children,
  minMs = 900,
}: {
  children: React.ReactNode;
  minMs?: number;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const done = () => {
      const elapsed = performance.now() - start;
      const left = Math.max(0, minMs - elapsed);
      window.setTimeout(() => setShow(false), left);
    };

    if (document.readyState === "complete") done();
    else window.addEventListener("load", done, { once: true });

    return () => window.removeEventListener("load", done);
  }, [minMs]);

  return (
    <>
      <ClassicProLoader show={show} name="Eng.Ellin Shaia" caption="Loading…" />
      {!show && children}
    </>
  );
}
