import CrudPage from '../components/CrudPage';

const columns = [
  { key: 'sort_order', label: 'Order' },
  { key: 'code', label: 'Code' },
  { key: 'name_en', label: 'Name' },
  { key: 'name_native', label: 'Native Name' },
  { key: 'is_active', label: 'Active', render: (val) => val ? '✅' : '❌' },
];

const formFields = [
  { key: 'code', label: 'Language Code (e.g. fr, es, de)', type: 'text' },
  { key: 'name_en', label: 'Name (English)', type: 'text' },
  { key: 'name_native', label: 'Native Name', type: 'text' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const Languages = () => (
  <CrudPage
    title="Languages"
    endpoint="/languages"
    columns={columns}
    formFields={formFields}
  />
);

export default Languages;
