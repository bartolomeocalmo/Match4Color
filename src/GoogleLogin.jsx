// GoogleLogin.jsx
import { useState, useEffect } from "react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function GoogleLogin({ onUserChange }) {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const u = result.user;
      setUser(u);
      if (onUserChange) onUserChange(u); // passa info utente ad App
    } catch (error) {
      console.error("Errore login:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    if (onUserChange) onUserChange(null);
  };

  // Controlla sessione attiva
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (onUserChange) onUserChange(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ marginBottom: "15px" }}>
      {user ? (
        <div>
          <span>Benvenuto, {user.displayName}</span>
          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      ) : (
        <button className="google-login-btn" onClick={handleLogin}>
          <img src="/google.svg" alt="Google" className="google-logo" />
          Accedi con Google
        </button>
      )}
    </div>
  );
}
