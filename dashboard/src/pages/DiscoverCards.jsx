import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'title_ar', label: 'Title (AR)' },
  { key: 'card_size', label: 'Size' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'discover-cards' },
  { key: 'card_size', label: 'Card Size', type: 'select', options: ['title', 'wide', 'narrow'] },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const DiscoverCardsPage = () => (
  <CrudPage title="Discover Cards" endpoint="/discover-cards" columns={columns} formFields={formFields} />
);

export default DiscoverCardsPage;
