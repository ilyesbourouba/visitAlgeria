import { useState, useEffect } from 'react';
import api from '../api';

const API_BASE = 'http://localhost:5001';

const CalendarPage = () => {
  const [months, setMonths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMonthModal, setShowMonthModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingMonth, setEditingMonth] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [monthForm, setMonthForm] = useState({ name_en: '', name_ar: '', sort_order: 0, is_active: true });
  const [itemForm, setItemForm] = useState({ month_id: '', title_en: '', title_ar: '', image_url: '', sort_order: 0, is_active: true });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewMedia, setPreviewMedia] = useState(null);

  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post('/upload?folder=calendar', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setItemForm(prev => ({ ...prev, image_url: res.data.url }));
    } catch (err) { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const fetchData = async () => {
    try {
      const res = await api.get('/calendar');
      setMonths(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Month CRUD
  const openCreateMonth = () => {
    setEditingMonth(null);
    setMonthForm({ name_en: '', name_ar: '', sort_order: 0, is_active: true });
    setShowMonthModal(true);
  };

  const openEditMonth = (m) => {
    setEditingMonth(m);
    setMonthForm({ name_en: m.name_en, name_ar: m.name_ar, sort_order: m.sort_order, is_active: m.is_active });
    setShowMonthModal(true);
  };

  const saveMonth = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingMonth) await api.put(`/calendar/months/${editingMonth.id}`, monthForm);
      else await api.post('/calendar/months', monthForm);
      setShowMonthModal(false);
      fetchData();
    } catch (err) { alert('Save failed'); }
    finally { setSaving(false); }
  };

  const deleteMonth = async (id) => {
    if (!confirm('Delete this month and all its items?')) return;
    await api.delete(`/calendar/months/${id}`);
    fetchData();
  };

  // Item CRUD
  const openCreateItem = (monthId) => {
    setEditingItem(null);
    setItemForm({ month_id: monthId, title_en: '', title_ar: '', image_url: '', sort_order: 0, is_active: true });
    setShowItemModal(true);
  };

  const openEditItem = (item) => {
    setEditingItem(item);
    setItemForm({ month_id: item.month_id, title_en: item.title_en, title_ar: item.title_ar, image_url: item.image_url || '', sort_order: item.sort_order, is_active: item.is_active });
    setShowItemModal(true);
  };

  const saveItem = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingItem) await api.put(`/calendar/items/${editingItem.id}`, itemForm);
      else await api.post('/calendar/items', itemForm);
      setShowItemModal(false);
      fetchData();
    } catch (err) { alert('Save failed'); }
    finally { setSaving(false); }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this item?')) return;
    await api.delete(`/calendar/items/${id}`);
    fetchData();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>Inspiration Calendar</h1>
        <button className="btn btn-primary" onClick={openCreateMonth}>+ Add Month</button>
      </div>

      {months.map(month => (
        <div key={month.id} className="nested-section">
          <div className="nested-header">
            <h2>{month.name_en} / {month.name_ar} {!month.is_active && <span className="badge-inactive">Inactive</span>}</h2>
            <div className="nested-actions">
              <button className="btn btn-sm btn-edit" onClick={() => openEditMonth(month)}>Edit</button>
              <button className="btn btn-sm btn-delete" onClick={() => deleteMonth(month.id)}>Delete</button>
              <button className="btn btn-sm btn-primary" onClick={() => openCreateItem(month.id)}>+ Item</button>
            </div>
          </div>
          {month.items && month.items.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr><th>Title (EN)</th><th>Title (AR)</th><th>Image</th><th>Order</th><th>Active</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {month.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.title_en}</td>
                      <td>{item.title_ar}</td>
                      <td>{item.image_url && <img src={getFullUrl(item.image_url)} alt="" className="table-thumb" style={{ cursor: 'pointer' }} onClick={() => setPreviewMedia({ url: getFullUrl(item.image_url), type: 'image' })} />}</td>
                      <td>{item.sort_order}</td>
                      <td>{item.is_active ? '✅' : '❌'}</td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-edit" onClick={() => openEditItem(item)}>Edit</button>
                        <button className="btn btn-sm btn-delete" onClick={() => deleteItem(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="empty-nested">No items yet</p>}
        </div>
      ))}

      {/* Month Modal */}
      {showMonthModal && (
        <div className="modal-overlay" onClick={() => setShowMonthModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingMonth ? 'Edit' : 'Add'} Month</h2>
              <button className="modal-close" onClick={() => setShowMonthModal(false)}>×</button>
            </div>
            <form onSubmit={saveMonth}>
              <div className="modal-body">
                <div className="form-group"><label>Name (EN)</label><input value={monthForm.name_en} onChange={e => setMonthForm({...monthForm, name_en: e.target.value})} required /></div>
                <div className="form-group"><label>Name (AR)</label><input value={monthForm.name_ar} onChange={e => setMonthForm({...monthForm, name_ar: e.target.value})} required /></div>
                <div className="form-group"><label>Sort Order</label><input type="number" value={monthForm.sort_order} onChange={e => setMonthForm({...monthForm, sort_order: Number(e.target.value)})} /></div>
                <div className="form-group"><label className="toggle-label"><input type="checkbox" checked={monthForm.is_active} onChange={e => setMonthForm({...monthForm, is_active: e.target.checked})} /><span>{monthForm.is_active ? 'Active' : 'Inactive'}</span></label></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowMonthModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {showItemModal && (
        <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit' : 'Add'} Calendar Item</h2>
              <button className="modal-close" onClick={() => setShowItemModal(false)}>×</button>
            </div>
            <form onSubmit={saveItem}>
              <div className="modal-body">
                <div className="form-group"><label>Title (EN)</label><input value={itemForm.title_en} onChange={e => setItemForm({...itemForm, title_en: e.target.value})} required /></div>
                <div className="form-group"><label>Title (AR)</label><input value={itemForm.title_ar} onChange={e => setItemForm({...itemForm, title_ar: e.target.value})} required /></div>
                <div className="form-group">
                  <label>Image</label>
                  <div className="upload-field">
                    {itemForm.image_url && (
                      <div className="upload-preview" onClick={() => setPreviewMedia({ url: getFullUrl(itemForm.image_url), type: 'image' })}>
                        <img src={getFullUrl(itemForm.image_url)} alt="Preview" />
                        <span className="preview-hint">Click to enlarge</span>
                      </div>
                    )}
                    <div className="upload-controls">
                      <input type="file" accept="image/*" onChange={e => handleFileUpload(e.target.files[0])} />
                      {uploading && <span className="upload-spinner">Uploading...</span>}
                    </div>
                  </div>
                </div>
                <div className="form-group"><label>Sort Order</label><input type="number" value={itemForm.sort_order} onChange={e => setItemForm({...itemForm, sort_order: Number(e.target.value)})} /></div>
                <div className="form-group"><label className="toggle-label"><input type="checkbox" checked={itemForm.is_active} onChange={e => setItemForm({...itemForm, is_active: e.target.checked})} /><span>{itemForm.is_active ? 'Active' : 'Inactive'}</span></label></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowItemModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Preview Modal */}
      {previewMedia && (
        <div className="modal-overlay preview-overlay" onClick={() => setPreviewMedia(null)}>
          <div className="preview-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close preview-close" onClick={() => setPreviewMedia(null)}>×</button>
            <img src={previewMedia.url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
