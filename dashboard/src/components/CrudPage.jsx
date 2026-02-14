import { useState, useEffect, useCallback } from 'react';
import api from '../api';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const API_BASE = 'http://localhost:5000';

/**
 * Generic CRUD page with:
 *  - File upload for image/video fields
 *  - Search filtering
 *  - Pagination
 *  - Media preview in modals
 */
const CrudPage = ({ title, endpoint, columns, formFields, transformBeforeSave }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({});

  // Search & Pagination
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Media preview modal
  const [previewMedia, setPreviewMedia] = useState(null);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get(endpoint);
      setItems(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // Reset to page 1 when search changes
  useEffect(() => { setCurrentPage(1); }, [search]);

  // --- Filtering & Pagination ---
  const filteredItems = items.filter(item => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return columns.some(col => {
      const val = item[col.key];
      if (val === null || val === undefined) return false;
      return String(val).toLowerCase().includes(q);
    });
  });

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIdx = (safeCurrentPage - 1) * pageSize;
  const paginatedItems = filteredItems.slice(startIdx, startIdx + pageSize);

  // --- CRUD actions ---
  const openCreate = () => {
    setEditingItem(null);
    const initial = {};
    formFields.forEach(f => {
      if (f.type === 'boolean') initial[f.key] = true;
      else if (f.type === 'number') initial[f.key] = 0;
      else initial[f.key] = '';
    });
    setFormData(initial);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingItem(item);
    const data = {};
    formFields.forEach(f => {
      if (f.type === 'multiselect') {
        // Convert array of objects (e.g. [{id:1, name_en:...}]) to array of IDs
        const arr = Array.isArray(item[f.key]) ? item[f.key] : [];
        data[f.key] = arr.map(v => typeof v === 'object' ? v.id : v);
      } else if (f.type === 'gallery' || f.type === 'tags') {
        data[f.key] = Array.isArray(item[f.key]) ? item[f.key] : [];
      } else {
        let val = item[f.key] ?? '';
        // If it's a date field, extract YYYY-MM-DD for <input type="date">
        if (f.key.toLowerCase().includes('date') && val && typeof val === 'string' && val.includes('T')) {
          val = val.split('T')[0];
        }
        data[f.key] = val;
      }
    });
    setFormData(data);
    setShowModal(true);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Filter out 'divider' fields from the payload
      const cleanData = { ...formData };
      formFields.forEach(f => {
        if (f.type === 'divider') {
          delete cleanData[f.key];
        }
      });

      if (editingItem) {
        const payload = transformBeforeSave ? transformBeforeSave({ ...cleanData }) : cleanData;
        await api.put(`${endpoint}/${editingItem.id}`, payload);
      } else {
        const payload = transformBeforeSave ? transformBeforeSave({ ...cleanData }) : cleanData;
        await api.post(endpoint, payload);
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await api.delete(`${endpoint}/${id}`);
      fetchItems();
    } catch (err) {
      alert('Delete failed');
    }
  };

  // --- File upload ---
  const handleFileUpload = async (fieldKey, file, folder, onSuccess) => {
    if (!file) return;
    setUploading(prev => ({ ...prev, [fieldKey]: true }));
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await api.post(`/upload?folder=${folder || 'general'}`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (onSuccess) {
        onSuccess(res.data.url);
      } else {
        handleChange(fieldKey, res.data.url);
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setUploading(prev => ({ ...prev, [fieldKey]: false }));
    }
  };

  // --- Helpers ---
  const getFullUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE}${url}`;
  };

  const isVideo = (url) => {
    if (!url) return false;
    return /\.(mp4|webm|mov|avi|ogg)(\?|$)/i.test(url);
  };

  // --- Renderers ---
  const renderCellValue = (item, col) => {
    const val = item[col.key];
    if (col.type === 'boolean') return val ? '✅' : '❌';
    if ((col.type === 'image') && val) {
      return <img src={getFullUrl(val)} alt="" className="table-thumb" onClick={() => setPreviewMedia({ url: getFullUrl(val), type: 'image' })} style={{ cursor: 'pointer' }} />;
    }
    if ((col.type === 'video') && val) {
      return (
        <button className="btn btn-sm btn-preview" onClick={() => setPreviewMedia({ url: getFullUrl(val), type: 'video' })}>
          ▶ Preview
        </button>
      );
    }
    if (val === null || val === undefined) return '—';
    if (typeof val === 'string' && val.length > 60) return val.substring(0, 60) + '…';
    return String(val);
  };

  const renderField = (field) => {
    const val = formData[field.key] ?? '';

    if (field.type === 'divider') {
      return (
        <div className="field-divider">
          <span>{field.label}</span>
        </div>
      );
    }

    if (field.type === 'boolean') {
      return (
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={!!val}
            onChange={e => handleChange(field.key, e.target.checked)}
          />
          <span>{val ? 'Active' : 'Inactive'}</span>
        </label>
      );
    }

    if (field.type === 'textarea') {
      return (
        <textarea
          value={val}
          onChange={e => handleChange(field.key, e.target.value)}
          rows={3}
          placeholder={field.label}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <select
          value={val}
          onChange={e => {
            const v = e.target.value;
            // If options are objects with value/label, parse numeric values
            const opts = field.options || [];
            if (opts.length > 0 && typeof opts[0] === 'object') {
              const numVal = Number(v);
              handleChange(field.key, isNaN(numVal) ? v : numVal);
            } else {
              handleChange(field.key, v);
            }
          }}
        >
          <option value="">Select...</option>
          {(field.options || []).map(opt => {
            if (typeof opt === 'object' && opt.value !== undefined) {
              return <option key={opt.value} value={opt.value}>{opt.label}</option>;
            }
            return <option key={opt} value={opt}>{opt}</option>;
          })}
        </select>
      );
    }

    if (field.type === 'number') {
      return (
        <input
          type="number"
          value={val}
          onChange={e => handleChange(field.key, Number(e.target.value))}
          placeholder={field.label}
        />
      );
    }

    // IMAGE upload
    if (field.type === 'image') {
      return (
        <div className="upload-field">
          {val && (
            <div className="upload-preview" onClick={() => setPreviewMedia({ url: getFullUrl(val), type: 'image' })}>
              <img src={getFullUrl(val)} alt="Preview" />
              <span className="preview-hint">Click to enlarge</span>
            </div>
          )}
          <div className="upload-controls">
            <input
              type="file"
              accept="image/*"
              onChange={e => handleFileUpload(field.key, e.target.files[0], field.folder || endpoint.replace('/', ''))}
            />
            {uploading[field.key] && <span className="upload-spinner">Uploading...</span>}
          </div>
        </div>
      );
    }

    // VIDEO upload
    if (field.type === 'video') {
      return (
        <div className="upload-field">
          {val && (
            <div className="upload-preview">
              <video src={getFullUrl(val)} controls style={{ maxWidth: '100%', maxHeight: '180px', borderRadius: '8px' }} />
              <span className="preview-hint" onClick={() => setPreviewMedia({ url: getFullUrl(val), type: 'video' })}>Click to enlarge</span>
            </div>
          )}
          <div className="upload-controls">
            <input
              type="file"
              accept="video/*"
              onChange={e => handleFileUpload(field.key, e.target.files[0], field.folder || endpoint.replace('/', ''))}
            />
            {uploading[field.key] && <span className="upload-spinner">Uploading...</span>}
          </div>
        </div>
      );
    }

    // GALLERY (array of { image_url, type } or strings)
    if (field.type === 'gallery') {
      const images = Array.isArray(formData[field.key]) ? formData[field.key] : [];
      return (
        <div className="gallery-field">
          <div className="gallery-grid">
            {images.map((img, idx) => {
              const url = typeof img === 'string' ? img : img.image_url;
              const itemType = typeof img === 'object' ? img.type : 'image';
              const isVideo = itemType === 'video' || /\.(mp4|webm|mov|avi)$/i.test(url || '');
              return (
                <div key={idx} className="gallery-item">
                  {isVideo ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <video src={getFullUrl(url)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                      <div style={{
                        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '24px', pointerEvents: 'none'
                      }}>▶</div>
                    </div>
                  ) : (
                    <img src={getFullUrl(url)} alt={`Gallery ${idx + 1}`} />
                  )}
                  <button
                    type="button"
                    className="gallery-remove-btn"
                    onClick={() => {
                      const updated = images.filter((_, i) => i !== idx);
                      handleChange(field.key, updated);
                    }}
                  >✕</button>
                </div>
              );
            })}
          </div>
          <div className="upload-controls">
            <input
              type="file"
              accept="image/*,video/mp4,video/webm,video/quicktime"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                for (const file of files) {
                  const fileType = file.type.startsWith('video/') ? 'video' : 'image';
                  const tempKey = `__gallery_temp_${Date.now()}`;
                  await handleFileUpload(
                    tempKey,
                    file,
                    field.folder || endpoint.replace('/', ''),
                    (url) => {
                      // Use functional update to avoid stale closure
                      setFormData(prev => ({
                        ...prev,
                        [field.key]: [...(Array.isArray(prev[field.key]) ? prev[field.key] : []), { image_url: url, type: fileType }]
                      }));
                    }
                  );
                }
                // Reset file input
                e.target.value = '';
              }}
            />
            {Object.keys(uploading).some(k => k.startsWith('__gallery_temp_')) && (
              <span className="upload-spinner">Uploading...</span>
            )}
          </div>
        </div>
      );
    }

    // MULTISELECT (checkboxes, options = [{ value, label }])
    if (field.type === 'multiselect') {
      const selected = Array.isArray(formData[field.key]) ? formData[field.key] : [];
      // selected can be array of IDs or array of { id }
      const selectedIds = selected.map(s => typeof s === 'object' ? s.id : s);
      return (
        <div className="multiselect-field">
          {(field.options || []).map(opt => (
            <label key={opt.value} className="multiselect-option">
              <input
                type="checkbox"
                checked={selectedIds.includes(opt.value)}
                onChange={(e) => {
                  let newVal;
                  if (e.target.checked) {
                    newVal = [...selectedIds, opt.value];
                  } else {
                    newVal = selectedIds.filter(id => id !== opt.value);
                  }
                  handleChange(field.key, newVal);
                }}
              />
              <span>{opt.label}</span>
            </label>
          ))}
          {(field.options || []).length === 0 && <span className="text-muted">No options available</span>}
        </div>
      );
    }

    // TAGS (array of { tag_en, tag_ar } or { name_en, name_ar })
    if (field.type === 'tags') {
      const keyEn = field.tagKeyEn || 'tag_en';
      const keyAr = field.tagKeyAr || 'tag_ar';
      const labelEn = field.tagLabelEn || 'Tag (English)';
      const labelAr = field.tagLabelAr || 'Tag (Arabic)';
      const tags = Array.isArray(formData[field.key]) ? formData[field.key] : [];
      return (
        <div className="tags-field">
          {tags.map((tag, idx) => (
            <div key={idx} className="tag-row">
              <input
                type="text"
                value={tag[keyEn] || ''}
                onChange={e => {
                  const updated = [...tags];
                  updated[idx] = { ...updated[idx], [keyEn]: e.target.value };
                  handleChange(field.key, updated);
                }}
                placeholder={labelEn}
              />
              <input
                type="text"
                value={tag[keyAr] || ''}
                onChange={e => {
                  const updated = [...tags];
                  updated[idx] = { ...updated[idx], [keyAr]: e.target.value };
                  handleChange(field.key, updated);
                }}
                placeholder={labelAr}
              />
              <button
                type="button"
                className="btn btn-delete btn-sm"
                onClick={() => {
                  const updated = tags.filter((_, i) => i !== idx);
                  handleChange(field.key, updated);
                }}
              >✕</button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handleChange(field.key, [...tags, { [keyEn]: '', [keyAr]: '' }])}
          >+ Add {field.tagLabelEn ? field.tagLabelEn.replace(' (EN)', '').replace(' (English)', '') : 'Tag'}</button>
        </div>
      );
    }

    // RICHTEXT (rich text editor)
    if (field.type === 'richtext') {
      const quillModules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'blockquote'],
          ['clean']
        ],
      };
      return (
        <div className="richtext-field">
          <ReactQuill
            theme="snow"
            value={val || ''}
            onChange={(content) => handleChange(field.key, content)}
            modules={quillModules}
            style={{ minHeight: '200px' }}
          />
        </div>
      );
    }

    return (
      <input
        type={field.type || 'text'}
        value={val}
        onChange={e => handleChange(field.key, e.target.value)}
        placeholder={field.label}
      />
    );
  };

  return (
    <div className="crud-page">
      <div className="crud-header">
        <h1>{title}</h1>
        <button className="btn btn-primary" onClick={openCreate}>+ Add New</button>
      </div>

      {/* Search & Page Size */}
      <div className="table-controls">
        <div className="table-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>×</button>
          )}
        </div>
        <select className="page-size-select" value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-state">{search ? 'No matching items found.' : 'No items found. Click "Add New" to create one.'}</div>
      ) : (
        <>
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  {columns.map(col => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item, i) => (
                  <tr key={item.id}>
                    <td>{startIdx + i + 1}</td>
                    {columns.map(col => (
                      <td key={col.key}>{renderCellValue(item, col)}</td>
                    ))}
                    <td className="actions-cell">
                      <button className="btn btn-sm btn-edit" onClick={() => openEdit(item)}>Edit</button>
                      <button className="btn btn-sm btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination">
            <span className="pagination-info">
              Showing {startIdx + 1}–{Math.min(startIdx + pageSize, filteredItems.length)} of {filteredItems.length}
            </span>
            <div className="pagination-controls">
              <button
                className="btn btn-sm"
                disabled={safeCurrentPage <= 1}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                ← Prev
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let page;
                if (totalPages <= 7) {
                  page = i + 1;
                } else if (safeCurrentPage <= 4) {
                  page = i + 1;
                } else if (safeCurrentPage >= totalPages - 3) {
                  page = totalPages - 6 + i;
                } else {
                  page = safeCurrentPage - 3 + i;
                }
                return (
                  <button
                    key={page}
                    className={`btn btn-sm ${page === safeCurrentPage ? 'btn-primary' : ''}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                className="btn btn-sm"
                disabled={safeCurrentPage >= totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next →
              </button>
            </div>
          </div>
        </>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal modal-lg" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit' : 'Create'} {title.replace(/s$/, '')}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {formFields.filter(f => editingItem || !f.hideOnCreate).map(field => (
                  <div className="form-group" key={field.key}>
                    <label>{field.label}</label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                </button>
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
            {previewMedia.type === 'video' ? (
              <video src={previewMedia.url} controls autoPlay style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
            ) : (
              <img src={previewMedia.url} alt="Preview" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudPage;
