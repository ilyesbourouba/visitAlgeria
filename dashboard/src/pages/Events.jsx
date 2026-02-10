import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'category', label: 'Category' },
  { key: 'region', label: 'Region' },
  { key: 'date_start', label: 'Start Date' },
  { key: 'is_featured', label: 'Featured', type: 'boolean' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'description_en', label: 'Description (English)', type: 'textarea' },
  { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' },
  { key: 'category', label: 'Category', type: 'select', options: ['festivals', 'exhibitions', 'concerts', 'sports', 'other'] },
  { key: 'region', label: 'Region', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'place', label: 'Venue', type: 'text' },
  { key: 'date_start', label: 'Start Date', type: 'date' },
  { key: 'date_end', label: 'End Date', type: 'date' },
  { key: 'time_start', label: 'Start Time', type: 'time' },
  { key: 'time_end', label: 'End Time', type: 'time' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'events' },
  { key: 'contact_phone', label: 'Contact Phone', type: 'text' },
  { key: 'contact_email', label: 'Contact Email', type: 'email' },
  { key: 'homepage', label: 'Homepage URL', type: 'text' },
  { key: 'is_featured', label: 'Featured on Homepage', type: 'boolean' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const EventsPage = () => (
  <CrudPage title="Events" endpoint="/events" columns={columns} formFields={formFields} />
);

export default EventsPage;
