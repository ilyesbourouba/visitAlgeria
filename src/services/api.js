// Shared API service for the visitAlgeria public frontend
const API_BASE = 'http://localhost:5000/api';
const SERVER_BASE = 'http://localhost:5000';

export async function fetchAPI(endpoint) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`);
    if (!res.ok) throw new Error(`API ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] ${endpoint} failed:`, err.message);
    return null;
  }
}

/**
 * Convert a relative media path (e.g. /uploads/hero-slides/abc.mp4)
 * to a fully qualified URL pointing at the API server.
 */
export function mediaUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${SERVER_BASE}${url}`;
}

/**
 * Helper: pick the right language field from an API record.
 * e.g. localize(item, 'title', 'ar') → item.title_ar || item.title_en
 */
export function localize(item, field, lang) {
  if (!item) return '';
  const val = item[`${field}_${lang}`];
  if (val) return val;
  // Fallback to English, then to any matching key
  return item[`${field}_en`] || item[field] || '';
}
