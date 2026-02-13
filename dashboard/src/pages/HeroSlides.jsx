import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'title_ar', label: 'Title (AR)' },
  { key: 'video_url', label: 'Video', type: 'video' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'video_url', label: 'Video', type: 'video', folder: 'hero-slides' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const HeroSlidesPage = () => (
  <CrudPage title="Hero Slides" endpoint="/hero-slides" columns={columns} formFields={formFields} />
);

export default HeroSlidesPage;
