export default function StyleSelector({ style, setStyle }) {
  return (
    <div className="style-select">
      {["casual", "elegant", "street"].map((s) => (
        <label key={s}>
          <input
            type="radio"
            name="style"
            value={s}
            checked={style === s}
            onChange={() => setStyle(s)}
          />
          <span>
            {s === "casual"
              ? "🟢 Casual"
              : s === "elegant"
              ? "⚫ Elegante"
              : "🔥 Street"}
          </span>
        </label>
      ))}
    </div>
  );
}
