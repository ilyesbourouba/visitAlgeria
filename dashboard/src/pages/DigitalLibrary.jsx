import { useState, useEffect } from 'react';
import CrudPage from '../components/CrudPage';
import api from '../api';

const columns = [
  { key: 'name_en', label: 'Name (EN)' },
  { key: 'name_ar', label: 'Name (AR)' },
  { key: 'category_name_en', label: 'Category' },
  { key: 'file_url', label: 'File', type: 'file' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const DigitalLibrary = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/library-categories');
        setCategoryOptions(res.data.map(c => ({ value: c.id, label: c.name_en })));
      } catch (err) {
        console.error('Failed to fetch library categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const formFields = [
    { key: 'name_en', label: 'Name (English)', type: 'text' },
    { key: 'name_ar', label: 'Name (Arabic)', type: 'text' },
    { key: 'category_id', label: 'Category', type: 'select', options: categoryOptions },
    { key: 'file_url', label: 'File (PDF or Image)', type: 'file', folder: 'digital-library' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ];

  return (
    <CrudPage
      title="Digital Library"
      endpoint="/digital-library"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default DigitalLibrary;
