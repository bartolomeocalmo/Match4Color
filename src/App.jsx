import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import GarmentSelector from "./GarmentSelector";
import StyleSelector from "./StyleSelector";
import Palette from "./Palette";
import ShareLink from "./ShareLink";
import { hexToHSL, buildPalette, getContrast } from "./utils";

function App() {
  const [baseColor, setBaseColor] = useState("#2980b9");
  const [garment, setGarment] = useState("top");
  const [style, setStyle] = useState("casual");
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);

  // Tema chiaro/scuro
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Outfit salvati
  const [savedOutfits, setSavedOutfits] = useState(() => {
    const stored = localStorage.getItem("savedOutfits");
    return stored ? JSON.parse(stored) : [];
  });

  const loadFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const outfitParam = params.get("outfit");
    if (outfitParam) {
      try {
        const data = JSON.parse(atob(outfitParam));
        setBaseColor(data.baseColor);
        setGarment(data.garment);
        setStyle(data.style);
        const baseHSL = hexToHSL(data.baseColor);
        setPalette(buildPalette(baseHSL, data.style, data.garment));
        setShowActionButtons(true);
      } catch (e) {
        console.error("Errore decoding outfit:", e);
      }
    }
  };

  useEffect(() => {
    loadFromURL();
    const onPopState = () => loadFromURL();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const generatePalette = () => {
    setLoading(true);
    setPalette([]);
    setTimeout(() => {
      const baseHSL = hexToHSL(baseColor);
      const colors = buildPalette(baseHSL, style, garment);
      setPalette(colors);
      setLoading(false);
      setShowActionButtons(true);
    }, 300);
  };

  const saveOutfit = () => {
    const outfit = { baseColor, garment, style, name: "" };
    const newList = [outfit, ...savedOutfits];
    setSavedOutfits(newList);
    localStorage.setItem("savedOutfits", JSON.stringify(newList));
  };

  const loadOutfit = (outfit) => {
    setBaseColor(outfit.baseColor);
    setGarment(outfit.garment);
    setStyle(outfit.style);
    const baseHSL = hexToHSL(outfit.baseColor);
    setPalette(buildPalette(baseHSL, outfit.style, outfit.garment));
    setShowActionButtons(true);
  };

  const deleteOutfit = (idx) => {
    const newList = savedOutfits.filter((_, i) => i !== idx);
    setSavedOutfits(newList);
    localStorage.setItem("savedOutfits", JSON.stringify(newList));
  };

  return (
    <div className={`container ${theme}`}>
      {/* Toggle tema in alto */}
      <div className="theme-switcher">
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>

      <h1>🎨 Match Color</h1>
      <p>Seleziona un colore e scopri gli abbinamenti perfetti</p>

      <ColorPicker baseColor={baseColor} setBaseColor={setBaseColor} />
      <GarmentSelector garment={garment} setGarment={setGarment} />
      <StyleSelector style={style} setStyle={setStyle} />

      {/* Pulsante principale */}
      <div style={{ marginTop: "15px" }}>
        <button onClick={generatePalette}>TROVA COMBINAZIONI</button>
      </div>

      {/* Mostra palette */}
      <Palette palette={palette} loading={loading} />

      {/* Pulsanti ShareLink + Salva Outfit, solo dopo generazione */}
      {showActionButtons && (
        <div
          className="action-buttons"
          style={{ marginTop: "10px", display: "flex", gap: "10px" }}
        >
          <ShareLink baseColor={baseColor} garment={garment} style={style} />
          <button onClick={saveOutfit}>💾 Salva Outfit</button>
        </div>
      )}

      {/* Sezione outfit salvati */}
      {/* Sezione outfit salvati */}
      <div className="saved-outfits">
        <h3>I miei outfit salvati</h3>
        {savedOutfits.length === 0 && <p>Nessun outfit salvato</p>}
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {savedOutfits.map((o, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className="color-card"
                style={{
                  background: o.baseColor,
                  color: getContrast(o.baseColor),
                  cursor: "pointer",
                }}
                title={`${o.garment} - ${o.style} - ${o.baseColor}`}
                onClick={() => loadOutfit(o)}
              >
                {o.baseColor}
              </div>

              {/* Input nome outfit ottimizzato */}
              <input
                type="text"
                className="saved-outfit-name"
                placeholder="Nome outfit"
                defaultValue={o.name}
                onBlur={(e) => {
                  const newList = [...savedOutfits];
                  newList[idx].name = e.target.value;
                  setSavedOutfits(newList);
                  localStorage.setItem("savedOutfits", JSON.stringify(newList));
                }}
              />

              {/* Pulsante elimina */}
              <button
                className="delete-outfit"
                onClick={() => deleteOutfit(idx)}
                style={{
                  marginTop: "5px",
                  padding: "4px 10px",
                  fontSize: "0.9rem",
                }}
              >
                🗑️ Elimina
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
