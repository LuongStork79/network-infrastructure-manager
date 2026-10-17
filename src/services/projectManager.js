// Quản lý Đa Dự Án (Multi-Project Manager)
const STORAGE_PROJECTS_KEY = 'nim_projects_list';
const STORAGE_ACTIVE_PROJECT_KEY = 'nim_active_project_id';

const DEFAULT_PROJECTS = [
  {
    id: 'default',
    name: 'Dự án Trung Tâm (DC-Monitoring)',
    desc: 'Hạ tầng mạng trung tâm, hệ thống Core Switch, CCTV, GPON, IPAM chính',
    location: 'Tòa nhà Trụ Sở Chính',
    createdAt: '17/10/2026',
    isDefault: true
  }
];

export function getProjectsList() {
  try {
    const raw = localStorage.getItem(STORAGE_PROJECTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading projects list:', e);
  }
  return DEFAULT_PROJECTS;
}

export function saveProjectsList(projects) {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects list:', e);
  }
}

export function getActiveProjectId() {
  try {
    const active = localStorage.getItem(STORAGE_ACTIVE_PROJECT_KEY);
    if (active) return active;
  } catch (e) {}
  return 'default';
}

export function getActiveProject() {
  const projects = getProjectsList();
  const activeId = getActiveProjectId();
  return projects.find(p => p.id === activeId) || projects[0] || DEFAULT_PROJECTS[0];
}

export function setActiveProjectId(id) {
  try {
    localStorage.setItem(STORAGE_ACTIVE_PROJECT_KEY, id);
    window.dispatchEvent(new CustomEvent('nim:project_changed', { detail: { projectId: id } }));
  } catch (e) {
    console.error('Error setting active project:', e);
  }
}

export function addProject({ name, desc, location }) {
  const projects = getProjectsList();
  const newId = 'proj_' + Date.now();
  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;
  
  const newProject = {
    id: newId,
    name: name.trim() || `Dự án mới ${projects.length + 1}`,
    desc: desc ? desc.trim() : 'Dự án hạ tầng mạng',
    location: location ? location.trim() : 'Chưa xác định',
    createdAt: dateStr,
    isDefault: false
  };

  const updated = [...projects, newProject];
  saveProjectsList(updated);
  return newProject;
}

export function updateProject(id, { name, desc, location }) {
  const projects = getProjectsList();
  const updated = projects.map(p => {
    if (p.id === id) {
      return {
        ...p,
        name: name !== undefined ? name.trim() : p.name,
        desc: desc !== undefined ? desc.trim() : p.desc,
        location: location !== undefined ? location.trim() : p.location
      };
    }
    return p;
  });
  saveProjectsList(updated);
  window.dispatchEvent(new CustomEvent('nim:projects_updated'));
  return updated;
}

export function deleteProject(id) {
  if (id === 'default') {
    throw new Error('Không thể xóa dự án mặc định của hệ thống!');
  }
  const projects = getProjectsList();
  const updated = projects.filter(p => p.id !== id);
  saveProjectsList(updated);

  if (getActiveProjectId() === id) {
    setActiveProjectId('default');
  }
  window.dispatchEvent(new CustomEvent('nim:projects_updated'));
  return updated;
}

// Trả về tên collection Firestore tương ứng cho dự án hiện tại
export function getProjectCollection(subName) {
  const activeId = getActiveProjectId();
  if (activeId === 'default') {
    return 'networkData';
  }
  return `networkData_${activeId}`;
}
