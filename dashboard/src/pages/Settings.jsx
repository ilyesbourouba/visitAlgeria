import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import api from '../api';

// These prefixes are managed on other dashboard pages or are unused
const HIDDEN_PREFIXES = ['social_', 'tg_hero_', 'unesco_', 'hero_subtitle_'];
// Rich-text keys get their own editors, not shown in the generic list
const RICH_TEXT_KEYS = ['visa_content', 'visa_content_ar', 'privacy_policy_content', 'privacy_policy_content_ar'];

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote'],
    ['link'],
    ['clean'],
  ],
};

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [visaContent, setVisaContent] = useState('');
  const [visaContentAr, setVisaContentAr] = useState('');
  const [privacyContent, setPrivacyContent] = useState('');
  const [privacyContentAr, setPrivacyContentAr] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings/list');
      const all = res.data;
      // Extract rich text values
      const visa = all.find(s => s.setting_key === 'visa_content');
      const visaAr = all.find(s => s.setting_key === 'visa_content_ar');
      const privacy = all.find(s => s.setting_key === 'privacy_policy_content');
      const privacyAr = all.find(s => s.setting_key === 'privacy_policy_content_ar');
      setVisaContent(visa?.setting_value || '');
      setVisaContentAr(visaAr?.setting_value || '');
      setPrivacyContent(privacy?.setting_value || '');
      setPrivacyContentAr(privacyAr?.setting_value || '');
      // Filter out hidden and rich-text keys
      const filtered = all.filter(
        s => !HIDDEN_PREFIXES.some(prefix => s.setting_key.startsWith(prefix))
          && !RICH_TEXT_KEYS.includes(s.setting_key)
      );
      setSettings(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleValueChange = (key, value) => {
    setSettings(prev => prev.map(s =>
      s.setting_key === key ? { ...s, setting_value: value } : s
    ));
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const obj = {};
      settings.forEach(s => { obj[s.setting_key] = s.setting_value; });
      // Include rich-text fields
      obj['visa_content'] = visaContent;
      obj['visa_content_ar'] = visaContentAr;
      obj['privacy_policy_content'] = privacyContent;
      obj['privacy_policy_content_ar'] = privacyContentAr;
      await api.put('/settings', obj);
      alert('Footer settings saved!');
    } catch (err) {
      alert('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const addSetting = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/settings/${newKey}`, { value: newValue });
      setShowModal(false);
      setNewKey('');
      setNewValue('');
      fetchSettings();
    } catch (err) {
      alert('Failed to add setting');
    }
  };

  const deleteSetting = async (key) => {
    if (!confirm(`Delete setting "${key}"?`)) return;
    await api.delete(`/settings/${key}`);
    fetchSettings();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>Footer Settings</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add</button>
          <button className="btn btn-success" onClick={saveAll} disabled={saving}>
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

      {/* Rich Text Editors for Visa & Privacy Policy */}
      <div style={{ marginTop: '24px', display: 'grid', gap: '32px' }}>
        {/* Visa */}
        <div>
          <h3 style={{ color: '#ccc', marginBottom: '16px', fontSize: '15px' }}>📄 Visa Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>English</label>
              <div style={{ background: '#fff', borderRadius: '8px' }}>
                <ReactQuill
                  theme="snow"
                  value={visaContent}
                  onChange={setVisaContent}
                  modules={quillModules}
                  style={{ minHeight: '180px' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>العربية (Arabic)</label>
              <div style={{ background: '#fff', borderRadius: '8px' }} dir="rtl">
                <ReactQuill
                  theme="snow"
                  value={visaContentAr}
                  onChange={setVisaContentAr}
                  modules={quillModules}
                  style={{ minHeight: '180px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Policy */}
        <div>
          <h3 style={{ color: '#ccc', marginBottom: '16px', fontSize: '15px' }}>🔒 Privacy Policy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>English</label>
              <div style={{ background: '#fff', borderRadius: '8px' }}>
                <ReactQuill
                  theme="snow"
                  value={privacyContent}
                  onChange={setPrivacyContent}
                  modules={quillModules}
                  style={{ minHeight: '180px' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '12px', marginBottom: '6px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>العربية (Arabic)</label>
              <div style={{ background: '#fff', borderRadius: '8px' }} dir="rtl">
                <ReactQuill
                  theme="snow"
                  value={privacyContentAr}
                  onChange={setPrivacyContentAr}
                  modules={quillModules}
                  style={{ minHeight: '180px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Existing key-value settings */}
      <h3 style={{ color: '#ccc', marginTop: '32px', marginBottom: '12px', fontSize: '15px' }}>⚙️ Other Settings</h3>
      <div className="settings-list">
        {settings.map(s => (
          <div key={s.id} className="setting-row">
            <div className="setting-key">{s.setting_key}</div>
            <div className="setting-value">
              <textarea
                value={s.setting_value || ''}
                onChange={e => handleValueChange(s.setting_key, e.target.value)}
                rows={s.setting_value && s.setting_value.length > 80 ? 3 : 1}
              />
            </div>
            <button className="btn btn-sm btn-delete" onClick={() => deleteSetting(s.setting_key)}>×</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Setting</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={addSetting}>
              <div className="modal-body">
                <div className="form-group"><label>Key</label><input value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="setting_key" required /></div>
                <div className="form-group"><label>Value</label><textarea value={newValue} onChange={e => setNewValue(e.target.value)} rows={3} /></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
