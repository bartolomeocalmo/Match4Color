export default function GarmentSelector({ garment, setGarment }) {
  return (
    <div className="garment-select">
      {["top", "bottom", "shoes"].map((g) => (
        <label key={g}>
          <input
            type="radio"
            name="garment"
            value={g}
            checked={garment === g}
            onChange={() => setGarment(g)}
          />
          <span>
            {g === "top"
              ? "👕 Maglia"
              : g === "bottom"
              ? "👖 Pantaloni"
              : "👟 Scarpe"}
          </span>
        </label>
      ))}
    </div>
  );
}
