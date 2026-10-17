// Quản lý Đa Dự Án (Multi-Project Manager)
// Lưu trữ tập trung trên Firebase Cloud Firestore: collection "networkData", document "projects"
// Hỗ trợ đồng bộ hóa thời gian thực và fallback offline qua localStorage.
import { db } from './firebase.js';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const STORAGE_PROJECTS_KEY = 'nim_projects_list';
const STORAGE_ACTIVE_PROJECT_KEY = 'nim_active_project_id';

export const DEFAULT_PROJECTS = [
  {
    id: 'default',
    name: 'Dự án Trung Tâm (DC-Monitoring)',
    desc: 'Hạ tầng mạng trung tâm, hệ thống Core Switch, CCTV, GPON, IPAM chính',
    location: 'Tòa nhà Trụ Sở Chính',
    createdAt: '17/10/2026',
    isDefault: true
  }
];

// Khung tủ Rack chuẩn khởi tạo cho dự án mới
export const DEFAULT_STARTER_RACKS = [
  { floor: 'Server Room', switches: [] },
  { floor: 'Tầng 1', switches: [] },
  { floor: 'Tầng 2', switches: [] }
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
    console.warn('Error reading projects list from localStorage:', e);
  }
  return DEFAULT_PROJECTS;
}

export function saveProjectsList(projects) {
  try {
    localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(projects));
  } catch (e) {
    console.error('Error saving projects list to localStorage:', e);
  }

  // Đồng bộ lên Google Cloud Firestore (Document: networkData/projects)
  try {
    const projectsRef = doc(db, 'networkData', 'projects');
    setDoc(projectsRef, { list: projects, updatedAt: new Date().toISOString() }, { merge: true })
      .catch(err => console.warn('Could not sync projects to Firestore:', err));
  } catch (e) {
    console.warn('Firestore sync failed:', e);
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

export function setActiveProjectId(id, options = { reload: true }) {
  try {
    localStorage.setItem(STORAGE_ACTIVE_PROJECT_KEY, id);
    window.dispatchEvent(new CustomEvent('nim:project_changed', { detail: { projectId: id } }));
    if (options.reload) {
      // Reload lại trang để rebind tất cả listener Firestore sang project mới
      window.location.reload();
    }
  } catch (e) {
    console.error('Error setting active project:', e);
  }
}

// Khởi tạo dữ liệu ban đầu cho dự án mới trong Firestore
export async function initProjectInfrastructure(newId, templateMode = 'standard') {
  try {
    const switchesRef = doc(db, 'networkData', `${newId}_switches`);
    if (templateMode === 'clone') {
      const currentActive = getActiveProjectId();
      const currentDocId = currentActive === 'default' ? 'switches' : `${currentActive}_switches`;
      const currentSnap = await getDoc(doc(db, 'networkData', currentDocId));
      if (currentSnap.exists()) {
        const clonedData = currentSnap.data();
        await setDoc(switchesRef, clonedData);
        return;
      }
    }
    // Mặc định tạo các Rack tiêu chuẩn để có thể thêm Switch ngay
    await setDoc(switchesRef, { DB: DEFAULT_STARTER_RACKS });
  } catch (err) {
    console.warn('Failed to initialize project infrastructure in Firestore:', err);
  }
}

export async function addProject({ name, desc, location, templateMode = 'standard' }) {
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

  // Khởi tạo các tủ Rack ban đầu trong Firestore
  await initProjectInfrastructure(newId, templateMode);

  window.dispatchEvent(new CustomEvent('nim:projects_updated'));
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
    setActiveProjectId('default', { reload: true });
  }
  window.dispatchEvent(new CustomEvent('nim:projects_updated'));
  return updated;
}

// Luôn dùng collection 'networkData' để bảo đảm Firebase Firestore Security Rules
export function getProjectCollection() {
  return 'networkData';
}

// Phân tách ID document theo dự án:
// - Dự án mặc định ('default'): giữ nguyên tên gốc ('switches', 'cctvCameras', ...)
// - Dự án tùy chọn: '${projectId}_${docName}'
export function getProjectDocId(docName) {
  const activeId = getActiveProjectId();
  if (!activeId || activeId === 'default') {
    return docName;
  }
  return `${activeId}_${docName}`;
}

// Lắng nghe thay đổi real-time danh sách Projects từ Firestore
let isListenerAttached = false;
export function subscribeToProjectsSync() {
  if (isListenerAttached) return;
  isListenerAttached = true;
  try {
    const projectsRef = doc(db, 'networkData', 'projects');
    onSnapshot(projectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        if (Array.isArray(data.list) && data.list.length > 0) {
          try {
            localStorage.setItem(STORAGE_PROJECTS_KEY, JSON.stringify(data.list));
            window.dispatchEvent(new CustomEvent('nim:projects_updated'));
          } catch (e) {}
        }
      } else {
        // Khởi tạo document projects nếu chưa có trên Firestore
        setDoc(projectsRef, { list: DEFAULT_PROJECTS, updatedAt: new Date().toISOString() })
          .catch(() => {});
      }
    }, (err) => {
      console.warn('Projects snapshot listener error:', err);
    });
  } catch (e) {
    console.warn('Could not setup projects real-time listener:', e);
  }
}

// Tự động khởi chạy listener khi import
if (typeof window !== 'undefined') {
  subscribeToProjectsSync();
}
