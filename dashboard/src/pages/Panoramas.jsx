import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'title_ar', label: 'Title (AR)' },
  { key: 'tag_en', label: 'Tag' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'tag_en', label: 'Tag (English)', type: 'text' },
  { key: 'tag_ar', label: 'Tag (Arabic)', type: 'text' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'panoramas' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const PanoramasPage = () => (
  <CrudPage title="Panoramas" endpoint="/panoramas" columns={columns} formFields={formFields} />
);

export default PanoramasPage;
