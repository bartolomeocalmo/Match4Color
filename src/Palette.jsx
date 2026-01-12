import { getContrast } from "./utils";
import { useEffect, useState } from "react";

export default function Palette({ palette, loading }) {
  const [show, setShow] = useState([]);

  useEffect(() => {
    if (!loading && palette.length > 0) {
      setShow([]);
      palette.forEach((color, i) => {
        setTimeout(() => {
          setShow((prev) => [...prev, color]);
        }, i * 100);
      });
    }
  }, [palette, loading]);

  return (
    <div className="results-wrapper">
      <h3>Abbinamenti consigliati</h3>
      <div
        id="results"
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => <div key={i} className="color-card shimmer"></div>)
          : show.map((c) => (
              <div
                key={c}
                className="color-card fade-in"
                style={{ background: c, color: getContrast(c) }}
                title={c}
              >
                {c}
              </div>
            ))}
      </div>
    </div>
  );
}
