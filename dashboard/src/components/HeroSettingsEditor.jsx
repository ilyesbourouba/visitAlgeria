import { useState, useEffect } from 'react';
import api from '../api';

const API_BASE = import.meta.env.VITE_API_URL; // For images

const HeroSettingsEditor = () => {
  const [data, setData] = useState({
    bg_image_url: '',
    badge_en: '',
    badge_ar: '',
    title_en: '',
    title_ar: '',
    subtitle_en: '',
    subtitle_ar: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return API_BASE + cleanPath;
  };

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await api.get('/tour-guide-hero');
        setData(res.data);
      } catch (err) {
        console.error('Failed to fetch hero settings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHero();
  }, []);

  const handleChange = (key, val) => {
    setData(prev => ({ ...prev, [key]: val }));
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post(`/upload?folder=tour-guide-hero`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      handleChange('bg_image_url', res.data.url);
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/tour-guide-hero', data);
      alert('Hero settings saved!');
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading Hero Settings...</div>;

  return (
    <div className="hero-settings-editor">
      <div className="crud-header">
        <h2>Tour Guide Hero Banner</h2>
        <button className="btn btn-success" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Banner'}
        </button>
      </div>

      <div className="hero-settings-grid">
        {/* Background Image */}
        <div className="form-group full-width">
          <label>Background Image</label>
          <div className="hero-upload-area">
            {data.bg_image_url && (
              <div className="hero-bg-preview">
                <img src={getFullUrl(data.bg_image_url)} alt="Hero BG" />
              </div>
            )}
            <div className="hero-upload-controls">
              <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files[0])} />
              {uploading && <span className="upload-spinner">Uploading...</span>}
            </div>
          </div>
        </div>

        {/* Badge */}
        <div className="form-group">
          <label>Badge (English)</label>
          <input value={data.badge_en || ''} onChange={e => handleChange('badge_en', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Badge (Arabic)</label>
          <input className="rtl" value={data.badge_ar || ''} onChange={e => handleChange('badge_ar', e.target.value)} />
        </div>

        {/* Title */}
        <div className="form-group">
          <label>Title (English)</label>
          <input value={data.title_en || ''} onChange={e => handleChange('title_en', e.target.value)} />
        </div>
        <div className="form-group">
          <label>Title (Arabic)</label>
          <input className="rtl" value={data.title_ar || ''} onChange={e => handleChange('title_ar', e.target.value)} />
        </div>

        {/* Subtitle */}
        <div className="form-group">
          <label>Subtitle (English)</label>
          <textarea value={data.subtitle_en || ''} onChange={e => handleChange('subtitle_en', e.target.value)} rows={3}></textarea>
        </div>
        <div className="form-group">
          <label>Subtitle (Arabic)</label>
          <textarea className="rtl" value={data.subtitle_ar || ''} onChange={e => handleChange('subtitle_ar', e.target.value)} rows={3}></textarea>
        </div>
      </div>
    </div>
  );
};

export default HeroSettingsEditor;
