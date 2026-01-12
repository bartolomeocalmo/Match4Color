export default function ColorPicker({ baseColor, setBaseColor }) {
  return (
    <input
      type="color"
      value={baseColor}
      onChange={(e) => setBaseColor(e.target.value)}
    />
  );
}
