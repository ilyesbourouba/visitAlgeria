import { useState, useEffect } from 'react';
import CrudPage from '../components/CrudPage';
import api from '../api';

const WILAYAS = [
  'Adrar','Chlef','Laghouat','Oum El Bouaghi','Batna','Béjaïa','Biskra','Béchar',
  'Blida','Bouira','Tamanrasset','Tébessa','Tlemcen','Tiaret','Tizi Ouzou','Algiers',
  'Djelfa','Jijel','Sétif','Saïda','Skikda','Sidi Bel Abbès','Annaba','Guelma',
  'Constantine','Médéa','Mostaganem','M\'Sila','Mascara','Ouargla','Oran','El Bayadh',
  'Illizi','Bordj Bou Arréridj','Boumerdès','El Tarf','Tindouf','Tissemsilt',
  'El Oued','Khenchela','Souk Ahras','Tipaza','Mila','Aïn Defla','Naâma',
  'Aïn Témouchent','Ghardaïa','Relizane','Timimoun','Bordj Badji Mokhtar',
  'Ouled Djellal','Béni Abbès','In Salah','In Guezzam','Touggourt',
  'Djanet','El M\'Ghair','El Meniaa'
];

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'region', label: 'Region' },
  { key: 'date_start', label: 'Start Date' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'is_featured', label: 'Featured', type: 'boolean' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const EventsPage = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get('/event-categories');
        setCategoryOptions(res.data.map(c => ({ value: c.id, label: c.name_en })));
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const formFields = [
    { key: 'title_en', label: 'Title (English)', type: 'text' },
    { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
    { key: 'subtitle_en', label: 'Subtitle (English)', type: 'text' },
    { key: 'subtitle_ar', label: 'Subtitle (Arabic)', type: 'text' },
    { key: 'description_en', label: 'Description (English)', type: 'textarea' },
    { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' },
    { key: 'categories', label: 'Categories', type: 'multiselect', options: categoryOptions },
    { key: 'region', label: 'Region (Wilaya)', type: 'select', options: WILAYAS },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'address', label: 'Address', type: 'text' },
    { key: 'place', label: 'Venue', type: 'text' },
    { key: 'date_start', label: 'Start Date', type: 'date' },
    { key: 'date_end', label: 'End Date', type: 'date' },
    { key: 'time_start', label: 'Start Time', type: 'time' },
    { key: 'time_end', label: 'End Time', type: 'time' },
    { key: 'image_url', label: 'Cover Image', type: 'image', folder: 'events' },
    { key: 'gallery', label: 'Photo Gallery', type: 'gallery', folder: 'events' },
    { key: 'contact_phone', label: 'Contact Phone', type: 'text' },
    { key: 'contact_email', label: 'Contact Email', type: 'email' },
    { key: 'homepage', label: 'Event Homepage URL', type: 'text' },
    { key: 'is_featured', label: 'Featured on Homepage', type: 'boolean' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ];

  return (
    <CrudPage title="Events" endpoint="/events" columns={columns} formFields={formFields} />
  );
};

export default EventsPage;
