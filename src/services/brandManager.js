// Quản lý Thương hiệu Switch (Switch Brands Manager)
const STORAGE_BRANDS_KEY = 'nim_custom_switch_brands';
const STORAGE_DELETED_BRANDS_KEY = 'nim_deleted_switch_brands';

export const DEFAULT_BRAND_COLORS = {
  Cisco: 'var(--cisco-blue)',
  Aruba: 'var(--aruba-orange)',
  HP: 'var(--hp-green)',
  Juniper: '#6366f1',
  'Allied Telesis': 'var(--allied-red)',
  'TPLink Omada': 'var(--tp-link)',
  Grandstream: 'var(--grandstream)',
  MikroTik: '#e11d48',
  Ruijie: '#2563eb',
  Fortinet: '#dc2626',
  Huawei: '#b91c1c',
  'Ubiquiti UniFi': '#0284c7',
  'D-Link': '#059669',
  DrayTek: '#d97706',
  'Dell EMC': '#1d4ed8',
  'Extreme Networks': '#7c3aed'
};

export const DEFAULT_BRAND_SHORT_CODES = {
  Cisco: 'CS',
  Aruba: 'AR',
  HP: 'HP',
  Juniper: 'JN',
  'Allied Telesis': 'AT',
  'TPLink Omada': 'TP',
  Grandstream: 'GS',
  MikroTik: 'MK',
  Ruijie: 'RJ',
  Fortinet: 'FT',
  Huawei: 'HW',
  'Ubiquiti UniFi': 'UF',
  'D-Link': 'DL',
  DrayTek: 'DT',
  'Dell EMC': 'DE',
  'Extreme Networks': 'EX'
};

export function getCustomBrands() {
  try {
    const raw = localStorage.getItem(STORAGE_BRANDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading custom brands:', e);
  }
  return {};
}

export function saveCustomBrands(brands) {
  try {
    localStorage.setItem(STORAGE_BRANDS_KEY, JSON.stringify(brands));
    window.dispatchEvent(new CustomEvent('nim:brands_updated', { detail: brands }));
  } catch (e) {
    console.error('Error saving custom brands:', e);
  }
}

export function getDeletedBrands() {
  try {
    const raw = localStorage.getItem(STORAGE_DELETED_BRANDS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch (e) {
    console.warn('Error reading deleted brands:', e);
  }
  return new Set();
}

export function saveDeletedBrands(deletedSet) {
  try {
    localStorage.setItem(STORAGE_DELETED_BRANDS_KEY, JSON.stringify(Array.from(deletedSet)));
    window.dispatchEvent(new CustomEvent('nim:brands_updated'));
  } catch (e) {
    console.error('Error saving deleted brands:', e);
  }
}

export function getAllBrandNames() {
  const custom = getCustomBrands();
  const deleted = getDeletedBrands();
  const allNames = new Set([...Object.keys(DEFAULT_BRAND_COLORS), ...Object.keys(custom)]);
  deleted.forEach((name) => allNames.delete(name));
  return Array.from(allNames);
}

export function getBrandColor(brandName) {
  if (!brandName) return '#64748b';
  const custom = getCustomBrands();
  if (custom[brandName]?.color) return custom[brandName].color;
  if (DEFAULT_BRAND_COLORS[brandName]) return DEFAULT_BRAND_COLORS[brandName];
  
  // Tạo màu tự động dựa trên tên thương hiệu nếu chưa có màu
  let hash = 0;
  for (let i = 0; i < brandName.length; i++) {
    hash = brandName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 45%)`;
}

export function getBrandShortCode(brandName) {
  if (!brandName) return 'SW';
  const custom = getCustomBrands();
  if (custom[brandName]?.code) return custom[brandName].code;
  if (DEFAULT_BRAND_SHORT_CODES[brandName]) return DEFAULT_BRAND_SHORT_CODES[brandName];
  return brandName.slice(0, 2).toUpperCase();
}

export function addCustomBrand(brandName, color = '#4f46e5', code = '') {
  const name = brandName.trim();
  if (!name) return null;
  const deleted = getDeletedBrands();
  if (deleted.has(name)) {
    deleted.delete(name);
    saveDeletedBrands(deleted);
  }
  const custom = getCustomBrands();
  const shortCode = code.trim() || name.slice(0, 2).toUpperCase();
  custom[name] = {
    color: color || '#4f46e5',
    code: shortCode
  };
  saveCustomBrands(custom);
  return { name, color: custom[name].color, code: shortCode };
}

export function deleteBrand(brandName) {
  if (!brandName) return false;
  const custom = getCustomBrands();
  if (custom[brandName]) {
    delete custom[brandName];
    saveCustomBrands(custom);
  }
  const deleted = getDeletedBrands();
  deleted.add(brandName);
  saveDeletedBrands(deleted);
  return true;
}

export const deleteCustomBrand = deleteBrand;

export function isCustomBrand(brandName) {
  if (!brandName) return false;
  const custom = getCustomBrands();
  return Boolean(custom[brandName]);
}

export function resetDeletedBrands() {
  try {
    localStorage.removeItem(STORAGE_DELETED_BRANDS_KEY);
    window.dispatchEvent(new CustomEvent('nim:brands_updated'));
    return true;
  } catch (e) {
    return false;
  }
}


