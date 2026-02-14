import CrudPage from '../components/CrudPage';

const wilayaOptions = Array.from({ length: 58 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} - ${[
    'Adrar', 'Chlef', 'Laghouat', 'Oum El Bouaghi', 'Batna', 'Béjaïa', 'Biskra', 'Béchar', 'Blida', 'Bouïra',
    'Tamanrasset', 'Tébessa', 'Tlemcen', 'Tiaret', 'Tizi Ouzou', 'Algiers', 'Djelfa', 'Jijel', 'Sétif', 'Saïda',
    'Skikda', 'Sidi Bel Abbès', 'Annaba', 'Guelma', 'Constantine', 'Médéa', 'Mostaganem', "M'Sila", 'Mascara', 'Ouargla',
    'Oran', 'El Bayadh', 'Illizi', 'Bordj Bou Arréridj', 'Boumerdès', 'El Tarf', 'Tindouf', 'Tissemsilt', 'El Oued', 'Khenchela',
    'Souk Ahras', 'Tipaza', 'Mila', 'Aïn Defla', 'Naâma', 'Aïn Témouchent', 'Ghardaïa', 'Relizane', 'Timimoun', 'Bordj Badji Mokhtar',
    'Ouled Djellal', 'Béni Abbès', 'Aïn Salah', 'Aïn Guezzam', 'Touggourt', 'Djanet', "El M'Ghair", 'El Menia'
  ][i]}`
}));

const columns = [
  { key: 'id', label: 'Code' },
  { key: 'name_en', label: 'Name' },
  { key: 'background_image', label: 'Image', type: 'image' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'id', label: 'Wilaya Number', type: 'select', options: wilayaOptions },
  { key: 'name_en', label: 'Name (EN)', type: 'text' },
  { key: 'name_ar', label: 'Name (AR)', type: 'text' },
  { key: 'background_image', label: 'Background Image', type: 'image', folder: 'destinations' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
  { key: 'show_on_homepage', label: 'Show in Suggestions', type: 'boolean' },
  
  { key: 'about_en', label: 'About (English)', type: 'richtext' },
  { key: 'about_ar', label: 'About (Arabic)', type: 'richtext' },
  
  { key: 'population', label: 'Population', type: 'text' },
  { key: 'area', label: 'Area', type: 'text' },
  { key: 'climate_en', label: 'Climate (EN)', type: 'text' },
  { key: 'climate_ar', label: 'Climate (AR)', type: 'text' },

  { key: 'gallery', label: 'Photos & Videos', type: 'gallery', folder: 'destinations' },
  { key: 'tags', label: 'Tags', type: 'tags', tagKeyEn: 'name_en', tagKeyAr: 'name_ar', tagLabelEn: 'Tag (EN)', tagLabelAr: 'Tag (AR)' },

  { key: 'best_time_en', label: 'Best Time to Visit (EN)', type: 'textarea' },
  { key: 'best_time_ar', label: 'Best Time to Visit (AR)', type: 'textarea' },
  { key: 'cuisine_en', label: 'Local Cuisine (EN)', type: 'textarea' },
  { key: 'cuisine_ar', label: 'Local Cuisine (AR)', type: 'textarea' },
  { key: 'etiquette_en', label: 'Cultural Etiquette (EN)', type: 'textarea' },
  { key: 'etiquette_ar', label: 'Cultural Etiquette (AR)', type: 'textarea' },
  { key: 'transport_en', label: 'Getting Around (EN)', type: 'textarea' },
  { key: 'transport_ar', label: 'Getting Around (AR)', type: 'textarea' },
];

const DestinationsPage = () => (
  <CrudPage title="Destinations" endpoint="/destinations" columns={columns} formFields={formFields} />
);

export default DestinationsPage;

