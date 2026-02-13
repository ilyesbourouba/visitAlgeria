import CrudPage from '../components/CrudPage';
import HeroSettingsEditor from '../components/HeroSettingsEditor';

const columns = [
  { key: 'sort_order', label: 'Order' },
  { key: 'title_en', label: 'Title (EN)' },
  { key: 'title_ar', label: 'Title (AR)' },
  { key: 'image_url', label: 'Image', type: 'image' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const formFields = [
  { key: 'title_en', label: 'Title (English)', type: 'text' },
  { key: 'title_ar', label: 'Title (Arabic)', type: 'text' },
  { key: 'description_en', label: 'Description (English)', type: 'textarea' },
  { key: 'description_ar', label: 'Description (Arabic)', type: 'textarea' },
  { key: 'image_url', label: 'Image', type: 'image', folder: 'tour-locations' },
  { key: 'matterport_url', label: 'Matterport/VR URL', type: 'text' },
  { key: 'tags', label: 'Tags', type: 'tags' },
  { key: 'sort_order', label: 'Sort Order', type: 'number' },
  { key: 'is_active', label: 'Active', type: 'boolean' },
];

const TourLocationsPage = () => (
  <div className="tour-guide-dashboard">
    <HeroSettingsEditor />
    
    <div className="section-divider">
      <hr />
      <span>Tour Locations</span>
      <hr />
    </div>

    <CrudPage 
      title="" 
      endpoint="/tour-locations" 
      columns={columns} 
      formFields={formFields} 
    />
  </div>
);

export default TourLocationsPage;
