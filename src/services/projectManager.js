// Quản lý Đa Dự Án (Multi-Project Manager)
// Lưu trữ tập trung trên Firebase Cloud Firestore: collection "networkData", document "projects"
import { db } from './firebase.js';
import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

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
      window.location.reload();
    }
  } catch (e) {
    console.error('Error setting active project:', e);
  }
}

// Khởi tạo toàn bộ dữ liệu hạ tầng cho dự án mới để có thể dùng ngay "như cái đầu tiên"
export async function initProjectInfrastructure(newId, templateMode = 'empty') {
  try {
    const modulesToClone = [
      'switches',
      'firewall',
      'wifi',
      'wifiFloorplans',
      'cctvCameras',
      'cctvFloorplans',
      'cctvFloorConnectors',
      'odf',
      'ipphone',
      'nvr',
      'krone',
      'gponFrame',
      'gponOnt',
      'elevator'
    ];

    if (templateMode === 'clone') {
      // Sao chép toàn bộ 100% thiết bị, tầng, sơ đồ từ Dự án Trung Tâm
      for (const mod of modulesToClone) {
        try {
          const snap = await getDoc(doc(db, 'networkData', mod));
          if (snap.exists()) {
            await setDoc(doc(db, 'networkData', `${newId}_${mod}`), snap.data());
          }
        } catch (e) {
          console.warn(`Could not clone ${mod}:`, e);
        }
      }
    } else if (templateMode === 'empty') {
      // Dự án hoàn toàn trống - người dùng tự thêm vị trí/tầng và thiết bị từ đầu
      const emptyInfrastructure = {
        DB: []
      };
      await setDoc(doc(db, 'networkData', `${newId}_switches`), emptyInfrastructure);
      await setDoc(doc(db, 'networkData', `${newId}_firewall`), { FirewallDB: [] });
      await setDoc(doc(db, 'networkData', `${newId}_wifi`), { WifiDB: [] });
      await setDoc(doc(db, 'networkData', `${newId}_cctvCameras`), { CctvCameraDB: [] });
      await setDoc(doc(db, 'networkData', `${newId}_odf`), { ODFDB: [] });
      await setDoc(doc(db, 'networkData', `${newId}_ipphone`), { IPPhoneDB: [] });
    } else {
      // Tạo khung hạ tầng chuẩn với Core Switch và 2 Access Switch hoạt động sẵn
      const coreId = `sw-${Date.now()}-core`;
      const standardInfrastructure = {
        DB: [
          {
            floor: 'Server Room',
            switches: [
              {
                id: coreId,
                name: '000-Core-SW',
                brand: 'Cisco',
                model: 'C9200L-24T-4X',
                ip: '10.195.32.1',
                mac: '00:1A:2B:3C:4D:01',
                ports: 24,
                sfpPorts: 4,
                isCore: true,
                uplinkTarget: 'none',
                targetPort: 1,
                uplinkPort: 24,
                uplinkType: 'Fiber',
                uplinkSpeed: '10G',
                zone: 'Server Room',
                color: 'var(--cisco-blue)',
                conns: [],
                logs: [{ time: '17/10/2026', msg: 'Khởi tạo Core Switch trung tâm' }]
              }
            ]
          },
          {
            floor: 'Basement',
            switches: []
          },
          {
            floor: 'Tầng 01',
            switches: [
              {
                id: `sw-${Date.now()}-t01`,
                name: 'SW-T01-01',
                brand: 'Cisco',
                model: 'C1200-24P-4G',
                ip: '10.195.32.11',
                mac: '00:1A:2B:3C:4D:11',
                ports: 24,
                sfpPorts: 4,
                isCore: false,
                uplinkTarget: coreId,
                targetPort: 24,
                uplinkPort: 24,
                uplinkType: 'Fiber',
                uplinkSpeed: '1G',
                zone: 'Tầng 01',
                color: 'var(--cisco-blue)',
                conns: [],
                logs: [{ time: '17/10/2026', msg: 'Khởi tạo Access Switch Tầng 1' }]
              }
            ]
          },
          {
            floor: 'Tầng 02',
            switches: [
              {
                id: `sw-${Date.now()}-t02`,
                name: 'SW-T02-01',
                brand: 'Cisco',
                model: 'C1200-24P-4G',
                ip: '10.195.32.12',
                mac: '00:1A:2B:3C:4D:12',
                ports: 24,
                sfpPorts: 4,
                isCore: false,
                uplinkTarget: coreId,
                targetPort: 23,
                uplinkPort: 24,
                uplinkType: 'Fiber',
                uplinkSpeed: '1G',
                zone: 'Tầng 02',
                color: 'var(--cisco-blue)',
                conns: [],
                logs: [{ time: '17/10/2026', msg: 'Khởi tạo Access Switch Tầng 2' }]
              }
            ]
          }
        ]
      };
      await setDoc(doc(db, 'networkData', `${newId}_switches`), standardInfrastructure);
    }
  } catch (err) {
    console.error('Failed to init project infrastructure:', err);
  }
}

export async function addProject({ name, desc, location, templateMode = 'clone' }) {
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

  // Khởi tạo trọn gói hạ tầng thiết bị trong Firestore
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

export async function deleteProject(id) {
  if (id === 'default') {
    throw new Error('Không thể xóa dự án mặc định của hệ thống!');
  }
  const projects = getProjectsList();
  const updated = projects.filter(p => p.id !== id);
  saveProjectsList(updated);

  // Xóa các document của dự án này trong collection networkData trên Firestore
  const modulesToDelete = [
    'switches', 'firewall', 'wifi', 'wifiFloorplans', 'cctvCameras',
    'cctvFloorplans', 'cctvFloorConnectors', 'odf', 'ipphone', 'nvr',
    'krone', 'gponFrame', 'gponOnt', 'elevator', 'backupHistory'
  ];
  for (const mod of modulesToDelete) {
    try {
      await deleteDoc(doc(db, 'networkData', `${id}_${mod}`));
    } catch (e) {
      console.warn(`Could not delete doc ${id}_${mod}:`, e);
    }
  }

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

if (typeof window !== 'undefined') {
  subscribeToProjectsSync();
}
