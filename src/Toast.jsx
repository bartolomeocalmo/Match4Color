import { useEffect } from "react";

export default function Toast({ message, show, onClose, duration = 2000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#2980b9",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        zIndex: 1000,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {message}
    </div>
  );
}
