import { useState, useEffect } from 'react';
import api from '../api';

const SettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings/list');
      setSettings(res.data);
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
      await api.put('/settings', obj);
      alert('Settings saved!');
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
        <h1>Site Settings</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add</button>
          <button className="btn btn-success" onClick={saveAll} disabled={saving}>
            {saving ? 'Saving...' : 'Save All'}
          </button>
        </div>
      </div>

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
