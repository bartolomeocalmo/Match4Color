import { useState, useEffect } from "react";

export default function ShareLink({ baseColor, garment, style }) {
  const [link, setLink] = useState("");
  const [showGenerated, setShowGenerated] = useState(false);

  // genera link codificato
  useEffect(() => {
    const data = { baseColor, garment, style };
    const encoded = btoa(JSON.stringify(data));
    setLink(`${window.location.origin}?outfit=${encoded}`);
  }, [baseColor, garment, style]);

  const handleGenerateClick = () => {
    setShowGenerated(true);

    // scompare dopo 3 secondi
    setTimeout(() => setShowGenerated(false), 3000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(link);
    alert("Link copiato!");
  };

  return (
    <div class="button-save-cond">
      <div
        className="share-link"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button onClick={handleGenerateClick}>📤Condividi Outfit</button>

        {showGenerated && (
          <div
            className="generated-wrapper"
            style={{
              marginTop: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <span className="link-generated">LINK GENERATO</span>
            <button onClick={copyLink}>📋 Copia Link</button>
          </div>
        )}
      </div>
    </div>
  );
}
