import { useState, useEffect } from 'react';
import CrudPage from '../components/CrudPage';
import api from '../api';

const columns = [
  { key: 'sort_order', label: 'Order' },
  { key: 'name_en', label: 'Name (EN)' },
  { key: 'name_ar', label: 'Name (AR)' },
  { key: 'region', label: 'Region' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const TravelAgencies = () => {
  const [regionOptions, setRegionOptions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get('/destinations');
        const data = Array.isArray(res.data) ? res.data : [];
        setRegionOptions(data.map(d => d.name_en).sort());
      } catch (err) {
        console.error('Failed to fetch destinations:', err);
      }
    };
    fetchRegions();
  }, []);

  const formFields = [
    { key: 'name_en', label: 'Name (English)', type: 'text' },
    { key: 'name_ar', label: 'Name (Arabic)', type: 'text' },
    { key: 'description_en', label: 'Description (English)', type: 'richtext' },
    { key: 'description_ar', label: 'Description (Arabic)', type: 'richtext' },
    { key: 'region', label: 'Region (Wilaya)', type: 'select', options: regionOptions },
    { key: 'image_url', label: 'Image', type: 'image', folder: 'travel-agencies' },
    { key: 'web_link', label: 'Website URL', type: 'text' },
    { key: 'tags', label: 'Tags', type: 'tags' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ];

  return (
    <CrudPage
      title="Travel Agencies"
      endpoint="/travel-agencies"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default TravelAgencies;
