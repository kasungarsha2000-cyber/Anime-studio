import { useState } from 'react';
import { UploadCloud, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ onImageUpload, label = "Upload Reference Image" }) {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{label}</label>
      <div 
        style={{ 
          border: '2px dashed var(--border-color)', 
          borderRadius: 'var(--border-radius-md)', 
          padding: preview ? '0' : '2rem', 
          textAlign: 'center',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg-card)'
        }}
      >
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
        />
        
        {preview ? (
          <div style={{ position: 'relative', height: '200px', width: '100%' }}>
            <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.6)', padding: '0.5rem', color: 'white', fontSize: '0.8rem' }}>
              Click or drag to change image
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
            <UploadCloud size={32} />
            <span>Drag and drop, or browse</span>
            <span style={{ fontSize: '0.8rem' }}>Supports JPG, PNG</span>
          </div>
        )}
      </div>
    </div>
  );
}
