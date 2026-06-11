import { useRef, useState } from "react";

type ImageUploadProps = {
  value: string | undefined;
  onChange: (base64: string | undefined) => void;
  label: string;
};

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(value);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target?.result as string;
      onChange(base64);
      setPreview(base64);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    onChange(undefined);
    setPreview(undefined);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-slate-400 uppercase">
        {label}
      </label>

      {preview && (
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5">
          <img src={preview} alt="preview" className="h-40 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 rounded-lg bg-red-600/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className="relative cursor-pointer rounded-lg border-2 border-dashed border-white/20 bg-white/[0.02] px-4 py-8 text-center transition-colors hover:border-teal-400/40 hover:bg-white/[0.05]"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={loading}
          className="hidden"
        />
        <p className="text-sm font-medium text-slate-400">
          {loading ? "Uploading…" : "Click to upload or drag and drop"}
        </p>
        <p className="mt-1 text-xs text-slate-500">PNG, JPG, GIF, WEBP (max 2MB)</p>
      </div>

      {value && !preview && (
        <div className="rounded-lg bg-teal-400/10 px-3 py-2 text-xs text-teal-300">
          ✓ Image uploaded ({Math.round(value.length / 1024)}KB)
        </div>
      )}
    </div>
  );
}
