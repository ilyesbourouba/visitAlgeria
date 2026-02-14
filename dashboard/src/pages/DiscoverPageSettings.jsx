import { useState, useEffect } from 'react';
import api from '../api';

const API_BASE = 'http://localhost:5000';

const getFullUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${API_BASE}${url}`;
};

const DiscoverPageSettings = () => {
  const [settings, setSettings] = useState({
    tag_en: '', tag_ar: '',
    title_en: '', title_ar: '',
    subtitle_en: '', subtitle_ar: '',
    background_image: ''
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/discover-system/page-settings');
        setSettings(prev => ({ ...prev, ...res.data }));
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchSettings();
  }, []);

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post('/upload?folder=discover', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      handleChange('background_image', res.data.url);
    } catch (err) { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/discover-system/page-settings', settings);
      alert('Settings saved successfully!');
    } catch (err) { alert('Save failed'); }
    finally { setSaving(false); }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>Discover Page Settings</h1>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="settings-form" style={{ maxWidth: '800px' }}>
        <div className="nested-section">
          <div className="nested-header"><h2>Hero Section</h2></div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: '16px' }}>
            <div className="form-group">
              <label>Tag (English)</label>
              <input value={settings.tag_en} onChange={e => handleChange('tag_en', e.target.value)} placeholder="e.g. Discover Algeria Now" />
            </div>
            <div className="form-group">
              <label>Tag (Arabic)</label>
              <input value={settings.tag_ar} onChange={e => handleChange('tag_ar', e.target.value)} placeholder="اكتشف الجزائر الآن" />
            </div>
            <div className="form-group">
              <label>Title (English)</label>
              <input value={settings.title_en} onChange={e => handleChange('title_en', e.target.value)} placeholder="Discover Destinations" />
            </div>
            <div className="form-group">
              <label>Title (Arabic)</label>
              <input value={settings.title_ar} onChange={e => handleChange('title_ar', e.target.value)} placeholder="اكتشف الوجهات" />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Subtitle (English)</label>
              <textarea value={settings.subtitle_en} onChange={e => handleChange('subtitle_en', e.target.value)} rows={2} placeholder="Explore the beauty..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Subtitle (Arabic)</label>
              <textarea value={settings.subtitle_ar} onChange={e => handleChange('subtitle_ar', e.target.value)} rows={2} placeholder="استكشف جمال..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Background Image</label>
              <div className="upload-field">
                {settings.background_image && (
                  <div className="upload-preview">
                    <img src={getFullUrl(settings.background_image)} alt="Background Preview" style={{ maxHeight: '200px', borderRadius: '8px' }} />
                  </div>
                )}
                <div className="upload-controls">
                  <input type="file" accept="image/*" onChange={e => handleImageUpload(e.target.files[0])} />
                  {uploading && <span className="upload-spinner">Uploading...</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverPageSettings;
