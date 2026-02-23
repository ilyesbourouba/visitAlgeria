import { useState, useEffect } from 'react';
import api from '../api';

const API_BASE = import.meta.env.VITE_API_URL;

const DiscoverPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCatModal, setShowCatModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingCat, setEditingCat] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [catForm, setCatForm] = useState({ name_en: '', name_ar: '', sort_order: 0, is_active: true });
  const [itemForm, setItemForm] = useState({ category_id: '', title_en: '', title_ar: '', description_en: '', description_ar: '', tag_en: '', tag_ar: '', image_url: '', card_size: 'medium', sort_order: 0, is_active: true });
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
      const res = await api.post('/upload?folder=discover', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setItemForm(prev => ({ ...prev, image_url: res.data.url }));
    } catch (err) { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const fetchData = async () => {
    try {
      const res = await api.get('/discover');
      setCategories(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const openCreateCat = () => { setEditingCat(null); setCatForm({ name_en: '', name_ar: '', sort_order: 0, is_active: true }); setShowCatModal(true); };
  const openEditCat = (c) => { setEditingCat(c); setCatForm({ name_en: c.name_en, name_ar: c.name_ar, sort_order: c.sort_order, is_active: c.is_active }); setShowCatModal(true); };

  const saveCat = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingCat) await api.put(`/discover/categories/${editingCat.id}`, catForm);
      else await api.post('/discover/categories', catForm);
      setShowCatModal(false); fetchData();
    } catch (err) { alert('Save failed'); } finally { setSaving(false); }
  };

  const deleteCat = async (id) => { if (!confirm('Delete category and all items?')) return; await api.delete(`/discover/categories/${id}`); fetchData(); };

  const openCreateItem = (catId) => { setEditingItem(null); setItemForm({ category_id: catId, title_en: '', title_ar: '', description_en: '', description_ar: '', tag_en: '', tag_ar: '', image_url: '', card_size: 'medium', sort_order: 0, is_active: true }); setShowItemModal(true); };
  const openEditItem = (item) => { setEditingItem(item); setItemForm({ category_id: item.category_id, title_en: item.title_en, title_ar: item.title_ar, description_en: item.description_en || '', description_ar: item.description_ar || '', tag_en: item.tag_en || '', tag_ar: item.tag_ar || '', image_url: item.image_url || '', card_size: item.card_size, sort_order: item.sort_order, is_active: item.is_active }); setShowItemModal(true); };

  const saveItem = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      if (editingItem) await api.put(`/discover/items/${editingItem.id}`, itemForm);
      else await api.post('/discover/items', itemForm);
      setShowItemModal(false); fetchData();
    } catch (err) { alert('Save failed'); } finally { setSaving(false); }
  };

  const deleteItem = async (id) => { if (!confirm('Delete?')) return; await api.delete(`/discover/items/${id}`); fetchData(); };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>Discover Page</h1>
        <button className="btn btn-primary" onClick={openCreateCat}>+ Add Category</button>
      </div>

      {categories.map(cat => (
        <div key={cat.id} className="nested-section">
          <div className="nested-header">
            <h2>{cat.name_en} / {cat.name_ar} {!cat.is_active && <span className="badge-inactive">Inactive</span>}</h2>
            <div className="nested-actions">
              <button className="btn btn-sm btn-edit" onClick={() => openEditCat(cat)}>Edit</button>
              <button className="btn btn-sm btn-delete" onClick={() => deleteCat(cat.id)}>Delete</button>
              <button className="btn btn-sm btn-primary" onClick={() => openCreateItem(cat.id)}>+ Item</button>
            </div>
          </div>
          {cat.items && cat.items.length > 0 ? (
            <div className="table-wrapper">
              <table className="data-table">
                <thead><tr><th>Title (EN)</th><th>Size</th><th>Image</th><th>Order</th><th>Active</th><th>Actions</th></tr></thead>
                <tbody>
                  {cat.items.map(item => (
                    <tr key={item.id}>
                      <td>{item.title_en}</td>
                      <td>{item.card_size}</td>
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

      {showCatModal && (
        <div className="modal-overlay" onClick={() => setShowCatModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>{editingCat ? 'Edit' : 'Add'} Category</h2><button className="modal-close" onClick={() => setShowCatModal(false)}>×</button></div>
            <form onSubmit={saveCat}>
              <div className="modal-body">
                <div className="form-group"><label>Name (EN)</label><input value={catForm.name_en} onChange={e => setCatForm({...catForm, name_en: e.target.value})} required /></div>
                <div className="form-group"><label>Name (AR)</label><input value={catForm.name_ar} onChange={e => setCatForm({...catForm, name_ar: e.target.value})} required /></div>
                <div className="form-group"><label>Sort Order</label><input type="number" value={catForm.sort_order} onChange={e => setCatForm({...catForm, sort_order: Number(e.target.value)})} /></div>
                <div className="form-group"><label className="toggle-label"><input type="checkbox" checked={catForm.is_active} onChange={e => setCatForm({...catForm, is_active: e.target.checked})} /><span>{catForm.is_active ? 'Active' : 'Inactive'}</span></label></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowCatModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showItemModal && (
        <div className="modal-overlay" onClick={() => setShowItemModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>{editingItem ? 'Edit' : 'Add'} Discover Item</h2><button className="modal-close" onClick={() => setShowItemModal(false)}>×</button></div>
            <form onSubmit={saveItem}>
              <div className="modal-body">
                <div className="form-group"><label>Title (EN)</label><input value={itemForm.title_en} onChange={e => setItemForm({...itemForm, title_en: e.target.value})} required /></div>
                <div className="form-group"><label>Title (AR)</label><input value={itemForm.title_ar} onChange={e => setItemForm({...itemForm, title_ar: e.target.value})} required /></div>
                <div className="form-group"><label>Description (EN)</label><textarea value={itemForm.description_en} onChange={e => setItemForm({...itemForm, description_en: e.target.value})} rows={3} /></div>
                <div className="form-group"><label>Description (AR)</label><textarea value={itemForm.description_ar} onChange={e => setItemForm({...itemForm, description_ar: e.target.value})} rows={3} /></div>
                <div className="form-group"><label>Tag (EN)</label><input value={itemForm.tag_en} onChange={e => setItemForm({...itemForm, tag_en: e.target.value})} /></div>
                <div className="form-group"><label>Tag (AR)</label><input value={itemForm.tag_ar} onChange={e => setItemForm({...itemForm, tag_ar: e.target.value})} /></div>
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
                <div className="form-group"><label>Card Size</label><select value={itemForm.card_size} onChange={e => setItemForm({...itemForm, card_size: e.target.value})}><option value="small">Small</option><option value="medium">Medium</option><option value="large">Large</option></select></div>
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

export default DiscoverPage;
