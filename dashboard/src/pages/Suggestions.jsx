import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'tag_en', label: 'Tag' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'tag_en', label: 'Tag (English)', type: 'text' },
  { key: 'tag_ar', label: 'Tag (Arabic)', type: 'text' },
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'description_en', label: 'Description (English)', type: 'textarea' },
  { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'suggestions' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const SuggestionsPage = () => (
  <CrudPage title="Suggestions" endpoint="/suggestions" columns={columns} formFields={formFields} />
);

export default SuggestionsPage;
