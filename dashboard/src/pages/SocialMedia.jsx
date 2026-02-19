import { useState, useEffect } from 'react';
import api from '../api';

const SOCIAL_PLATFORMS = [
  { key: 'social_facebook', label: 'Facebook', icon: '📘', placeholder: 'https://facebook.com/yourpage' },
  { key: 'social_instagram', label: 'Instagram', icon: '📷', placeholder: 'https://instagram.com/yourpage' },
  { key: 'social_tiktok', label: 'TikTok', icon: '🎵', placeholder: 'https://tiktok.com/@yourpage' },
  { key: 'social_youtube', label: 'YouTube', icon: '🎬', placeholder: 'https://youtube.com/yourchannel' },
  { key: 'social_twitter', label: 'X (Twitter)', icon: '🐦', placeholder: 'https://x.com/yourhandle' },
  { key: 'social_linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/company/yourpage' },
  { key: 'social_pinterest', label: 'Pinterest', icon: '📌', placeholder: 'https://pinterest.com/yourpage' },
];

const SocialMedia = () => {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/settings');
        const data = res.data || {};
        const v = {};
        SOCIAL_PLATFORMS.forEach(p => { v[p.key] = data[p.key] || ''; });
        setValues(v);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/settings', values);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>Social Media Links</h1>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gap: '16px', maxWidth: '600px', marginTop: '20px' }}>
        {SOCIAL_PLATFORMS.map(p => (
          <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px', width: '36px', textAlign: 'center' }}>{p.icon}</span>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '4px', color: '#ccc' }}>{p.label}</label>
              <input
                type="url"
                value={values[p.key] || ''}
                onChange={e => setValues(prev => ({ ...prev, [p.key]: e.target.value }))}
                placeholder={p.placeholder}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: '#1a1a1a',
                  border: '1px solid #333',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '14px',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
