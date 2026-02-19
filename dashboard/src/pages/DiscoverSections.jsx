import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'name_en', label: 'Name (EN)' },
  { key: 'name_ar', label: 'Name (AR)' },
  { key: 'place_count', label: 'Places' },
  { key: 'sort_order', label: 'Order' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'name_en', label: 'Name (English)', type: 'text' },
  { key: 'name_ar', label: 'Name (Arabic)', type: 'text' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const DiscoverSections = () => {
  return (
    <CrudPage title="Discover Sections" endpoint="/discover-system/sections" columns={columns} formFields={formFields} />
  );
};

export default DiscoverSections;
