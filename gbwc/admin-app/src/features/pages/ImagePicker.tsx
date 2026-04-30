import { authFetch } from '@/lib/auth-fetch';
import { toast } from 'sonner';

export const ImagePicker = ({ value, onChange }: any) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading('Uploading image...');

    try {
      const res = await authFetch("/api/uploads/single?folder=pages", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Upload failed (${res.status})`);
      }
      
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
        toast.success('Image uploaded successfully', { id: toastId });
      } else {
        throw new Error('No URL in response');
      }
    } catch (err: any) {
      console.error('Upload Error:', err);
      toast.error(`Error: ${err.message}`, { id: toastId });
    }
  };

  return (
    <div className="flex flex-col gap-2 p-1 border rounded-md bg-muted/30">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1.5 border rounded bg-background text-xs"
          placeholder="Image URL or path..."
        />
        <label className="flex items-center justify-center px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs cursor-pointer hover:bg-primary/90 transition-colors shrink-0">
          Upload
          <input 
            type="file" 
            className="hidden" 
            onChange={handleChange} 
            accept="image/*" 
          />
        </label>
      </div>
      {value && (
        <div className="relative aspect-video rounded overflow-hidden border bg-background flex items-center justify-center mt-1">
          <img 
            src={value} 
            alt="Preview" 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full shadow-sm hover:scale-105 transition-transform"
            title="Remove image"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
