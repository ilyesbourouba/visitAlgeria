import { useState, useEffect } from 'react';
import CrudPage from '../components/CrudPage';
import api from '../api';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'title_ar', label: 'Title (AR)' },
  { key: 'subtitle_en', label: 'Subtitle (EN)' },
  { key: 'video_url', label: 'Video', type: 'video' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const HeroSlidesPage = () => {
  const [wilayaOptions, setWilayaOptions] = useState([]);

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const res = await api.get('/destinations');
        const data = Array.isArray(res.data) ? res.data : [];
        setWilayaOptions(
          data
            .filter(d => d.is_active)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map(d => ({ value: d.id, label: `${d.id} - ${d.name_en}` }))
        );
      } catch (err) {
        console.error('Failed to fetch destinations:', err);
      }
    };
    fetchWilayas();
  }, []);

  const formFields = [
    { key: 'section_basic', label: '📝 Basic Info', type: 'divider' },
    { key: 'title_en', label: 'Title (English)', type: 'text' },
    { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
    { key: 'video_url', label: 'Video', type: 'video', folder: 'hero-slides' },
    { key: 'is_active', label: 'Active', type: 'boolean' },

    { key: 'section_subtitle', label: '🔗 Subtitle Link & Popup', type: 'divider' },
    { key: 'subtitle_en', label: 'Subtitle Link Text (English)', type: 'text' },
    { key: 'subtitle_ar', label: 'Subtitle Link Text (Arabic)', type: 'text' },
    { key: 'bg_image_url', label: 'Popup Header Image', type: 'image', folder: 'hero-slides' },
    { key: 'description_en', label: 'Popup Description (English)', type: 'richtext' },
    { key: 'description_ar', label: 'Popup Description (Arabic)', type: 'richtext' },

    { key: 'section_wilayas', label: '🗺️ Affiliated Wilayas', type: 'divider' },
    { key: 'wilaya_ids', label: 'Select Wilayas', type: 'multiselect', options: wilayaOptions },
  ];

  // Convert wilaya_ids between comma-separated string (DB) and array (UI)
  const transformBeforeSave = (data) => {
    if (Array.isArray(data.wilaya_ids)) {
      data.wilaya_ids = data.wilaya_ids.join(',');
    }
    return data;
  };

  return (
    <CrudPage
      title="Hero Slides"
      endpoint="/hero-slides"
      columns={columns}
      formFields={formFields}
      transformBeforeSave={transformBeforeSave}
    />
  );
};

export default HeroSlidesPage;
