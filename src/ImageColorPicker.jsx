import { useRef } from "react";

function ImageColorPicker({ setBaseColor }) {
  const fileInputRef = useRef(null);

  const openCamera = () => {
    fileInputRef.current.click();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = () => (img.src = reader.result);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 40) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      const hex =
        "#" +
        [r, g, b]
          .map((v) =>
            Math.round(v / count)
              .toString(16)
              .padStart(2, "0")
          )
          .join("");

      setBaseColor(hex);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      <button className="camera-btn" onClick={openCamera}>
        📸
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={handleImage}
      />
    </>
  );
}

export default ImageColorPicker;
