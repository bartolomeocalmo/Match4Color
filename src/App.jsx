import { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import GarmentSelector from "./GarmentSelector";
import StyleSelector from "./StyleSelector";
import Palette from "./Palette";
import ShareLink from "./ShareLink";
import { hexToHSL, buildPalette, getContrast } from "./utils";
import Toast from "./Toast";
import ImageColorPicker from "./ImageColorPicker";
import { Link } from "react-router-dom";
import GoogleLogin from "./GoogleLogin";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [baseColor, setBaseColor] = useState("#2980b9");
  const [garment, setGarment] = useState("top");
  const [style, setStyle] = useState("casual");
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [user, setUser] = useState(null); // utente Google

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
  const [savedOutfits, setSavedOutfits] = useState([]);

  // Carica outfit quando cambia user
  useEffect(() => {
    const loadOutfits = async () => {
      if (!user) {
        // utente anonimo → localStorage
        const localOutfits =
          JSON.parse(localStorage.getItem("savedOutfits")) || [];
        setSavedOutfits(localOutfits);
        return;
      }

      // utente loggato → Firestore (SOLO suoi)
      try {
        const q = query(
          collection(db, "outfits"),
          where("userId", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        const outfits = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setSavedOutfits(outfits);
      } catch (err) {
        console.error("Errore caricamento Firestore:", err);
        setSavedOutfits([]);
      }
    };

    loadOutfits();
  }, [user]);

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

  const saveOutfit = async () => {
    const outfit = { baseColor, garment, style, name: "" };

    if (!user) {
      // anonimo → localStorage
      const newList = [outfit, ...savedOutfits];
      setSavedOutfits(newList);
      localStorage.setItem("savedOutfits", JSON.stringify(newList));
    } else {
      // loggato → Firestore
      try {
        const docRef = await addDoc(collection(db, "outfits"), {
          ...outfit,
          userId: user.uid,
        });

        setSavedOutfits([{ ...outfit, id: docRef.id }, ...savedOutfits]);
      } catch (err) {
        console.error("Errore salvataggio Firestore:", err);
      }
    }

    setToastMessage("Outfit salvato!");
    setShowToast(true);
  };

  const loadOutfit = (outfit) => {
    setBaseColor(outfit.baseColor);
    setGarment(outfit.garment);
    setStyle(outfit.style);
    const baseHSL = hexToHSL(outfit.baseColor);
    setPalette(buildPalette(baseHSL, outfit.style, outfit.garment));
    setShowActionButtons(true);
  };

  const deleteOutfit = async (idx) => {
    const outfit = savedOutfits[idx];
    const newList = savedOutfits.filter((_, i) => i !== idx);
    setSavedOutfits(newList);

    if (!user) {
      localStorage.setItem("savedOutfits", JSON.stringify(newList));
    } else if (outfit.id) {
      try {
        await deleteDoc(doc(db, "outfits", outfit.id));
      } catch (err) {
        console.error("Errore eliminazione Firestore:", err);
      }
    }
  };

  return (
    <div className={`container ${theme}`}>
      <div className="top-bar">
        {/* Google Login */}
        <GoogleLogin onUserChange={setUser} />

        {/* Toggle tema */}
        <div className="theme-switcher">
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </div>
      <h1>Match4Color</h1>
      <p>Seleziona un colore e scopri gli abbinamenti perfetti</p>
      <div className="color-row">
        <ColorPicker baseColor={baseColor} setBaseColor={setBaseColor} />
        <ImageColorPicker setBaseColor={setBaseColor} />
      </div>
      <GarmentSelector garment={garment} setGarment={setGarment} />
      <StyleSelector style={style} setStyle={setStyle} />

      <div style={{ marginTop: "15px" }}>
        <button onClick={generatePalette}>TROVA COMBINAZIONI</button>
      </div>

      <Palette palette={palette} loading={loading} />

      {showActionButtons && (
        <div
          className="action-buttons"
          style={{ marginTop: "10px", display: "flex", gap: "10px" }}
        >
          <ShareLink baseColor={baseColor} garment={garment} style={style} />
          <button onClick={saveOutfit}>💾 Salva Outfit</button>
        </div>
      )}

      <div className="saved-outfits">
        <h3>I miei outfit salvati</h3>
        {savedOutfits.length === 0 && <p>Nessun outfit salvato</p>}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
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
              <input
                type="text"
                className="saved-outfit-name"
                placeholder="Nome outfit"
                defaultValue={o.name}
                onBlur={(e) => {
                  const newList = [...savedOutfits];
                  newList[idx].name = e.target.value;
                  setSavedOutfits(newList);
                  if (!user) {
                    localStorage.setItem(
                      "savedOutfits",
                      JSON.stringify(newList)
                    );
                  }
                }}
              />
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

      <Toast
        message={toastMessage}
        show={showToast}
        onClose={() => setShowToast(false)}
      />

      <footer className="footer">
        <div>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Termini e Condizioni</Link>
        </div>
        <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Match4Color. Tutti i diritti
          riservati.
        </div>
      </footer>
    </div>
  );
}

export default App;
