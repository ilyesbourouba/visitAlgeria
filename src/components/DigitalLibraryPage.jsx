import React, { useState, useEffect, useMemo } from 'react';
import './DigitalLibraryPage.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getTranslation } from '../translations/translations';

const API_BASE = import.meta.env.VITE_API_URL;

const DigitalLibraryPage = ({ onClose }) => {
  const { language, isRTL } = useLanguage();
  const t = (key) => getTranslation(language, key);

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const localize = (item, field) => {
    if (!item) return '';
    if (language === 'ar') return item[`${field}_ar`] || item[`${field}_en`] || '';
    return item[`${field}_en`] || item[`${field}_ar`] || '';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [filesRes, catsRes] = await Promise.all([
          fetch(`${API_BASE}/api/digital-library?active=true`),
          fetch(`${API_BASE}/api/library-categories`)
        ]);
        const filesResult = await filesRes.json();
        const catsData = await catsRes.json();
        const data = filesResult.data || filesResult;
        setFiles(Array.isArray(data) ? data : []);
        setCategories(Array.isArray(catsData) ? catsData : []);
      } catch (err) {
        console.error('Failed to load library files:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${API_BASE}${cleanPath}`;
  };

  const isPdf = (url) => /\.pdf(\?|$)/i.test(url || '');

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const nameEn = (file.name_en || '').toLowerCase();
      const nameAr = (file.name_ar || '').toLowerCase();
      const q = search.toLowerCase();
      const matchesSearch = !search.trim() || nameEn.includes(q) || nameAr.includes(q);
      const matchesCategory = categoryFilter === 'all' || String(file.category_id) === String(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [search, categoryFilter, files]);

  const getCategoryName = (file) => {
    if (language === 'ar' && file.category_name_ar) return file.category_name_ar;
    return file.category_name_en || '';
  };

  return (
    <div className={`library-page-overlay ${isRTL ? 'rtl' : ''}`}>
      <div className="library-page-content">
        <button className="library-close-btn" onClick={onClose} aria-label={t('close')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <header className="library-header">
          <h1>{t('digitalLibraryTitle')}</h1>

          <div className="library-controls">
            <div className="library-search-bar">
              <svg className="library-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                placeholder={t('searchLibrary')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {categories.length > 0 && (
              <div className="library-filter-row">
                <button
                  className={`library-filter-btn ${categoryFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setCategoryFilter('all')}
                >
                  {t('allCategories')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`library-filter-btn ${String(categoryFilter) === String(cat.id) ? 'active' : ''}`}
                    onClick={() => setCategoryFilter(cat.id)}
                  >
                    {localize(cat, 'name')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        {loading ? (
          <div className="library-loading">Loading...</div>
        ) : filteredFiles.length === 0 ? (
          <div className="library-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            <p>{t('noFilesFound')}</p>
          </div>
        ) : (
          <div className="library-grid">
            {filteredFiles.map(file => (
              <div key={file.id} className="library-card">
                <div className="library-card-preview">
                  {isPdf(file.file_url) ? (
                    <div className="library-card-pdf-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>PDF</span>
                    </div>
                  ) : (
                    <img src={getFullUrl(file.file_url)} alt={localize(file, 'name')} />
                  )}
                  {getCategoryName(file) && (
                    <span className="library-card-category">{getCategoryName(file)}</span>
                  )}
                </div>
                <div className="library-card-info">
                  <h3>{localize(file, 'name')}</h3>
                  <div className="library-card-actions">
                    <a
                      href={getFullUrl(file.file_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="library-btn library-btn-primary"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {t('viewFile')}
                    </a>
                    <a
                      href={getFullUrl(file.file_url)}
                      download
                      className="library-btn library-btn-secondary"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      {t('downloadFile')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalLibraryPage;
