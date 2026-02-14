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
  { key: 'name_en', label: 'Name (EN)' },
  { key: 'region', label: 'Region' },
  { key: 'section_name_en', label: 'Section' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'show_on_homepage', label: 'Homepage', type: 'boolean' },
  { key: 'show_on_unesco', label: 'UNESCO', type: 'boolean' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const DiscoverPlaces = () => {
  const [sectionOptions, setSectionOptions] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get('/discover-system/sections');
        setSectionOptions(res.data.map(s => ({ value: s.id, label: s.name_en })));
      } catch (err) {
        console.error('Failed to fetch sections:', err);
      }
    };
    fetchSections();
  }, []);

  const formFields = [
    { key: 'section_id', label: 'Section', type: 'select', options: sectionOptions },
    { key: 'name_en', label: 'Name (English)', type: 'text' },
    { key: 'name_ar', label: 'Name (Arabic)', type: 'text' },
    { key: 'region', label: 'Region (Wilaya)', type: 'select', options: WILAYAS },
    { key: 'categories', label: 'Categories', type: 'tags', tagLabelEn: 'Category (EN)', tagLabelAr: 'Category (AR)', tagKeyEn: 'name_en', tagKeyAr: 'name_ar' },
    { key: 'image_url', label: 'Background Image', type: 'image', folder: 'discover' },
    { key: 'gallery', label: 'Photo Gallery', type: 'gallery', folder: 'discover' },
    { key: 'info_en', label: 'Information (English)', type: 'richtext' },
    { key: 'info_ar', label: 'Information (Arabic)', type: 'richtext' },
    { key: 'show_on_homepage', label: 'Show on Homepage (Discover Algeria Now)', type: 'boolean' },
    { key: 'show_on_unesco', label: 'Show on UNESCO Heritage Section', type: 'boolean' },
    { key: 'sort_order', label: 'Sort Order', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'boolean' },
  ];

  return (
    <CrudPage
      title="Discover Places"
      endpoint="/discover-system/places"
      columns={columns}
      formFields={formFields}
    />
  );
};

export default DiscoverPlaces;
