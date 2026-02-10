import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'name_en', label: 'Name (EN)' },
  { key: 'name_ar', label: 'Name (AR)' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'name_en', label: 'Name (English)', type: 'text' },
  { key: 'name_ar', label: 'Name (Arabic)', type: 'text' },
  { key: 'description_en', label: 'Description (English)', type: 'textarea' },
  { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'destinations' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const DestinationsPage = () => (
  <CrudPage title="Destinations" endpoint="/destinations" columns={columns} formFields={formFields} />
);

export default DestinationsPage;
