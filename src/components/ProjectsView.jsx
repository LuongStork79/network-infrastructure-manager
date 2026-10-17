import React, { useState, useEffect } from '../core/react-adapter.js';
import {
  getProjectsList,
  getActiveProjectId,
  getActiveProject,
  setActiveProjectId,
  addProject,
  updateProject,
  deleteProject
} from '../services/projectManager.js';
import { db } from '../services/firebase.js';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAllBrandNames } from '../services/brandManager.js';

export default function ProjectsView({ onBack }) {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'devices'
  const [projects, setProjects] = useState(getProjectsList());
  const [activeId, setActiveIdState] = useState(getActiveProjectId());
  
  // Selected project to inspect/manage devices (defaults to active project)
  const [inspectProjId, setInspectProjId] = useState(getActiveProjectId());
  const [projectFloors, setProjectFloors] = useState([]);
  const [isLoadingDevices, setIsLoadingDevices] = useState(false);

  // Project Modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projName, setProjName] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projLocation, setProjLocation] = useState('');
  const [templateMode, setTemplateMode] = useState('empty'); // 'empty' | 'standard' | 'clone'
  const [projectFormError, setProjectFormError] = useState('');
  const [isSubmittingProj, setIsSubmittingProj] = useState(false);

  // Switch Modal states
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [editingSwitch, setEditingSwitch] = useState(null);
  const [swName, setSwName] = useState('');
  const [swIp, setSwIp] = useState('');
  const [swBrand, setSwBrand] = useState('Cisco');
  const [swModel, setSwModel] = useState('');
  const [swFloor, setSwFloor] = useState('Server Room');
  const [swCustomFloor, setSwCustomFloor] = useState('');
  const [swPorts, setSwPorts] = useState(24);
  const [swType, setSwType] = useState('access');
  const [switchFormError, setSwitchFormError] = useState('');
  const [isSubmittingSwitch, setIsSubmittingSwitch] = useState(false);

  // Sync projects list
  useEffect(() => {
    function handleUpdate() {
      setProjects(getProjectsList());
      setActiveIdState(getActiveProjectId());
    }
    window.addEventListener('nim:projects_updated', handleUpdate);
    window.addEventListener('nim:project_changed', handleUpdate);
    return () => {
      window.removeEventListener('nim:projects_updated', handleUpdate);
      window.removeEventListener('nim:project_changed', handleUpdate);
    };
  }, []);

  // Fetch switches for the inspectProjId
  useEffect(() => {
    if (!inspectProjId) return;
    setIsLoadingDevices(true);
    const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
    const docRef = doc(db, 'networkData', docName);

    const unsub = onSnapshot(docRef, (snap) => {
      setIsLoadingDevices(false);
      if (snap.exists()) {
        const data = snap.data();
        setProjectFloors(Array.isArray(data.DB) ? data.DB : []);
      } else {
        setProjectFloors([
          { floor: 'Server Room', switches: [] },
          { floor: 'Tầng 01', switches: [] },
          { floor: 'Tầng 02', switches: [] },
          { floor: 'Tầng 03', switches: [] },
          { floor: 'Outside', switches: [] }
        ]);
      }
    }, (err) => {
      setIsLoadingDevices(false);
      console.warn('Error fetching project switches:', err);
    });

    return () => unsub();
  }, [inspectProjId]);

  // Flatten all switches from projectFloors
  const currentInspectProject = projects.find(p => p.id === inspectProjId) || { name: 'Dự án', id: inspectProjId };
  const allSwitches = [];
  (projectFloors || []).forEach(f => {
    (f.switches || []).forEach(s => {
      allSwitches.push({ ...s, floorName: f.floor });
    });
  });

  // --- PROJECT ACTIONS ---
  function handleOpenAddProject() {
    setEditingProject(null);
    setProjName('');
    setProjDesc('');
    setProjLocation('');
    setTemplateMode('empty');
    setProjectFormError('');
    setIsProjectModalOpen(true);
  }

  function handleOpenEditProject(proj) {
    setEditingProject(proj);
    setProjName(proj.name);
    setProjDesc(proj.desc || '');
    setProjLocation(proj.location || '');
    setProjectFormError('');
    setIsProjectModalOpen(true);
  }

  async function handleSaveProject(e) {
    e.preventDefault();
    if (!projName.trim()) {
      setProjectFormError('Vui lòng nhập tên dự án!');
      return;
    }

    setIsSubmittingProj(true);
    try {
      if (editingProject) {
        updateProject(editingProject.id, { name: projName, desc: projDesc, location: projLocation });
        setProjects(getProjectsList());
        setIsProjectModalOpen(false);
      } else {
        const created = await addProject({
          name: projName,
          desc: projDesc,
          location: projLocation,
          templateMode
        });
        setProjects(getProjectsList());
        setIsProjectModalOpen(false);
        setInspectProjId(created.id);
        setActiveTab('devices');
        // Kích hoạt làm việc trên dự án mới
        setActiveProjectId(created.id, { reload: true });
      }
    } catch (err) {
      setProjectFormError(err.message || 'Lỗi khi lưu dự án');
    } finally {
      setIsSubmittingProj(false);
    }
  }

  function handleSwitchActiveProject(id) {
    if (id === activeId) return;
    setActiveProjectId(id, { reload: true });
  }

  async function handleDeleteProject(proj) {
    if (proj.isDefault || proj.id === 'default') {
      alert('Không thể xóa dự án mặc định của hệ thống!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${proj.name}" không?\nToàn bộ dữ liệu Switch, WiFi, CCTV, IPAM của dự án này sẽ bị xóa khỏi đám mây.`)) {
      try {
        await deleteProject(proj.id);
        setProjects(getProjectsList());
        if (inspectProjId === proj.id) {
          setInspectProjId('default');
        }
      } catch (err) {
        alert(err.message);
      }
    }
  }

  // --- DEVICE ACTIONS ---
  function handleOpenAddSwitch() {
    setEditingSwitch(null);
    setSwName(`SW-${currentInspectProject.name.substring(0, 3).toUpperCase() || 'NET'}-${allSwitches.length + 1}`);
    setSwIp('192.168.1.' + (10 + allSwitches.length));
    setSwBrand('Cisco');
    setSwModel('CBS350-24T');
    setSwFloor(projectFloors[0]?.floor || 'Server Room');
    setSwCustomFloor('');
    setSwPorts(24);
    setSwType(allSwitches.length === 0 ? 'core' : 'access');
    setSwitchFormError('');
    setIsSwitchModalOpen(true);
  }

  function handleOpenEditSwitch(sw) {
    setEditingSwitch(sw);
    setSwName(sw.name || '');
    setSwIp(sw.ip || '');
    setSwBrand(sw.brand || 'Cisco');
    setSwModel(sw.model || '');
    setSwFloor(sw.floorName || 'Server Room');
    setSwCustomFloor('');
    setSwPorts(sw.totalPorts || 24);
    setSwType(sw.type || 'access');
    setSwitchFormError('');
    setIsSwitchModalOpen(true);
  }

  async function handleSaveSwitch(e) {
    e.preventDefault();
    if (!swName.trim()) {
      setSwitchFormError('Vui lòng nhập tên Switch!');
      return;
    }
    if (!swIp.trim()) {
      setSwitchFormError('Vui lòng nhập IP quản trị của Switch!');
      return;
    }

    const targetFloorName = swFloor === '__custom__' ? (swCustomFloor.trim() || 'Tầng Mới') : swFloor;
    setIsSubmittingSwitch(true);

    try {
      const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
      const docRef = doc(db, 'networkData', docName);

      let updatedFloors = JSON.parse(JSON.stringify(projectFloors));

      if (editingSwitch) {
        // Edit existing switch
        updatedFloors.forEach(f => {
          f.switches = (f.switches || []).filter(s => s.id !== editingSwitch.id);
        });
        let targetFloor = updatedFloors.find(f => f.floor === targetFloorName);
        if (!targetFloor) {
          targetFloor = { floor: targetFloorName, switches: [] };
          updatedFloors.push(targetFloor);
        }
        targetFloor.switches.push({
          ...editingSwitch,
          name: swName.trim(),
          ip: swIp.trim(),
          brand: swBrand,
          model: swModel.trim() || 'CBS350',
          totalPorts: Number(swPorts),
          type: swType
        });
      } else {
        // Add new switch
        const newSwId = `sw-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        const newPorts = Array.from({ length: Number(swPorts) }, (_, i) => ({
          port: i + 1,
          status: 'down',
          vlan: 1,
          type: swType === 'core' ? 'trunk' : 'access',
          device: ''
        }));

        let targetFloor = updatedFloors.find(f => f.floor === targetFloorName);
        if (!targetFloor) {
          targetFloor = { floor: targetFloorName, switches: [] };
          updatedFloors.push(targetFloor);
        }
        targetFloor.switches.push({
          id: newSwId,
          name: swName.trim(),
          ip: swIp.trim(),
          brand: swBrand,
          model: swModel.trim() || 'CBS350',
          totalPorts: Number(swPorts),
          type: swType,
          ports: newPorts
        });
      }

      await setDoc(docRef, { DB: updatedFloors }, { merge: true });
      setProjectFloors(updatedFloors);
      setIsSwitchModalOpen(false);
    } catch (err) {
      setSwitchFormError(err.message || 'Lỗi khi lưu Switch');
    } finally {
      setIsSubmittingSwitch(false);
    }
  }

  async function handleDeleteSwitch(sw) {
    if (!confirm(`Bạn có chắc chắn muốn xóa Switch "${sw.name}" (${sw.ip}) khỏi dự án này?`)) return;

    try {
      const docName = inspectProjId === 'default' ? 'switches' : `${inspectProjId}_switches`;
      const docRef = doc(db, 'networkData', docName);

      const updatedFloors = projectFloors.map(f => ({
        ...f,
        switches: (f.switches || []).filter(s => s.id !== sw.id)
      }));

      await setDoc(docRef, { DB: updatedFloors }, { merge: true });
      setProjectFloors(updatedFloors);
    } catch (err) {
      alert('Lỗi xóa switch: ' + err.message);
    }
  }

  const brandOptions = getAllBrandNames ? getAllBrandNames() : ['Cisco', 'Ruijie', 'Aruba', 'MikroTik', 'Huawei', 'TP-Link', 'Ubiquiti UniFi', 'D-Link', 'HP'];

  return (
    <div className="view-container flex flex-col h-full bg-slate-50 overflow-hidden font-sans">
      {/* Top Header */}
      <div className="view-header px-6 py-4 border-b border-slate-200 bg-white shadow-xs flex flex-wrap justify-between items-center shrink-0 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-100 text-lg">
            <i className="fas fa-folder-tree"></i>
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
              Quản Lý Dự Án & Hạ Tầng Thiết Bị
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                {projects.length} Dự án
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Đang làm việc: <strong className="text-indigo-600 font-bold">{projects.find(p => p.id === activeId)?.name || 'Dự án Trung Tâm'}</strong> (ID: {activeId})
            </p>
          </div>
        </div>

        {/* View Switch Buttons & Actions */}
        <div className="flex items-center gap-2">
          {/* Tab Navigation */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-building text-[11px]"></i>
              Danh Sách Dự Án
            </button>
            <button
              onClick={() => setActiveTab('devices')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'devices'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fas fa-server text-[11px]"></i>
              Thiết Bị Của Dự Án ({allSwitches.length})
            </button>
          </div>

          <button
            onClick={handleOpenAddProject}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fas fa-plus text-[10px]"></i>
            Tạo Dự Án Mới
          </button>

          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <i className="fas fa-arrow-left text-[10px]"></i>
              Về Sơ Đồ Topology
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scroll p-6">
        <div className="max-w-6xl mx-auto space-y-6">

          {/* TAB 1: DANH SÁCH DỰ ÁN */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-800">Các Dự Án Hạ Tầng Của Bạn</h3>
                  <p className="text-xs text-slate-500">Bấm "Chọn làm việc" để chuyển sơ đồ, hoặc "Quản lý thiết bị" để thêm/sửa switch của dự án đó.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((proj) => {
                  const isActive = proj.id === activeId;
                  return (
                    <div
                      key={proj.id}
                      className={`bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between relative overflow-hidden ${
                        isActive
                          ? 'border-indigo-500 shadow-lg shadow-indigo-100/50 ring-2 ring-indigo-500/20'
                          : 'border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
                      }`}
                    >
                      {/* Top Info */}
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                                isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <i className="fas fa-building"></i>
                            </div>
                            <div>
                              <h4 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-1">
                                {proj.name}
                              </h4>
                              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                <i className="fas fa-location-dot text-[10px]"></i>
                                {proj.location || 'Chưa cập nhật vị trí'}
                              </span>
                            </div>
                          </div>

                          {isActive && (
                            <span className="shrink-0 px-2.5 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1 uppercase tracking-wider">
                              <i className="fas fa-circle-check text-[10px]"></i>
                              Đang chọn
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed min-h-[32px] line-clamp-2 mb-4">
                          {proj.desc || 'Không có mô tả chi tiết cho dự án này.'}
                        </p>
                      </div>

                      {/* Footer & Actions */}
                      <div>
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium mb-3">
                          <span>
                            <i className="fas fa-calendar-alt mr-1 text-slate-300"></i>
                            {proj.createdAt || 'N/A'}
                          </span>
                          <span className="font-mono bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100 text-slate-500 text-[10px]">
                            ID: {proj.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive ? (
                            <button
                              disabled
                              className="flex-1 py-2 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 border border-emerald-200 cursor-default"
                            >
                              <i className="fas fa-check"></i>
                              Đang làm việc
                            </button>
                          ) : (
                            <button
                              onClick={() => handleSwitchActiveProject(proj.id)}
                              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                              title="Chuyển sơ đồ và toàn bộ hệ thống sang dự án này"
                            >
                              <i className="fas fa-arrow-right-to-bracket text-[10px]"></i>
                              Chọn làm việc
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setInspectProjId(proj.id);
                              setActiveTab('devices');
                            }}
                            className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl border border-indigo-200 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
                            title="Xem và quản lý thiết bị của dự án này"
                          >
                            <i className="fas fa-server"></i>
                            Thiết bị
                          </button>

                          <button
                            onClick={() => handleOpenEditProject(proj)}
                            className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all text-xs cursor-pointer"
                            title="Sửa thông tin dự án"
                          >
                            <i className="fas fa-edit"></i>
                          </button>

                          {!proj.isDefault && proj.id !== 'default' && (
                            <button
                              onClick={() => handleDeleteProject(proj)}
                              className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition-all text-xs cursor-pointer"
                              title="Xóa dự án"
                            >
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: QUẢN LÝ THIẾT BỊ CỦA DỰ ÁN */}
          {activeTab === 'devices' && (
            <div className="space-y-4">
              {/* Project selector bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-lg font-bold">
                    <i className="fas fa-network-wired"></i>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Đang quản lý thiết bị của:</span>
                      <select
                        value={inspectProjId}
                        onChange={(e) => setInspectProjId(e.target.value)}
                        className="text-xs font-bold text-indigo-800 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1 cursor-pointer outline-none hover:bg-indigo-100"
                      >
                        {projects.map(p => (
                          <option key={p.id} value={p.id}>
                            {p.name} {p.id === activeId ? '(Đang hoạt động)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Tổng số: <strong className="text-slate-700 font-bold">{allSwitches.length} Switch</strong> trong dự án này
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {inspectProjId !== activeId && (
                    <button
                      onClick={() => handleSwitchActiveProject(inspectProjId)}
                      className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <i className="fas fa-check-double text-[10px]"></i>
                      Kích Hoạt Làm Việc Dự Án Này
                    </button>
                  )}

                  <button
                    onClick={handleOpenAddSwitch}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="fas fa-plus text-[10px]"></i>
                    + Thêm Switch Mới Vào Dự Án
                  </button>

                  {onBack && (
                    <button
                      onClick={onBack}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Mở sơ đồ Topology"
                    >
                      <i className="fas fa-diagram-project text-[10px]"></i>
                      Xem Trên Sơ Đồ Topology
                    </button>
                  )}
                </div>
              </div>

              {/* Switches Table / Cards */}
              {isLoadingDevices ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
                  <i className="fas fa-spinner fa-spin text-xl text-indigo-600 mb-2 block"></i>
                  Đang tải thiết bị của dự án...
                </div>
              ) : allSwitches.length === 0 ? (
                <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-3">
                    <i className="fas fa-server"></i>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800">Dự án này chưa có Switch nào</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
                    Bạn vừa tạo một dự án sạch hoàn toàn. Hãy bấm nút dưới đây để thêm thiết bị đầu tiên cho dự án này!
                  </p>
                  <button
                    onClick={handleOpenAddSwitch}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fas fa-plus"></i>
                    Thêm Switch Đầu Tiên Cho Dự Án
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-3 px-4">Tên Thiết Bị (Switch)</th>
                          <th className="py-3 px-4">IP Quản Trị</th>
                          <th className="py-3 px-4">Tầng / Vị Trí</th>
                          <th className="py-3 px-4">Hãng & Model</th>
                          <th className="py-3 px-4">Số Port</th>
                          <th className="py-3 px-4">Loại Switch</th>
                          <th className="py-3 px-4 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {allSwitches.map((sw) => (
                          <tr key={sw.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4 font-extrabold text-slate-800 flex items-center gap-2">
                              <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs">
                                <i className="fas fa-server"></i>
                              </span>
                              <div>
                                <span>{sw.name}</span>
                                <span className="block text-[10px] font-mono text-slate-400 font-normal">ID: {sw.id}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-indigo-700">
                              {sw.ip || 'Chưa cấu hình'}
                            </td>
                            <td className="py-3 px-4 text-slate-600 font-medium">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[11px]">
                                <i className="fas fa-layer-group text-[9px]"></i>
                                {sw.floorName}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-700 font-medium">
                              <span className="font-bold text-slate-800">{sw.brand || 'Cisco'}</span>
                              <span className="text-slate-400 text-[10px] ml-1.5">{sw.model || ''}</span>
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">
                              {sw.totalPorts || sw.ports?.length || 24} Ports
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                sw.type === 'core'
                                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                  : sw.type === 'distribution'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                {sw.type || 'Access'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditSwitch(sw)}
                                  className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                                  title="Chỉnh sửa Switch này"
                                >
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  onClick={() => handleDeleteSwitch(sw)}
                                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa Switch khỏi dự án"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* MODAL 1: THÊM / SỬA DỰ ÁN */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                <i className="fas fa-folder-plus text-indigo-600"></i>
                {editingProject ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </h3>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="p-6 space-y-4">
              {projectFormError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
                  <i className="fas fa-triangle-exclamation"></i>
                  {projectFormError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên Dự Án <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Tòa Nhà Park 2, Chi nhánh Cần Thơ..."
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Vị trí / Địa chỉ
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: 123 Nguyễn Văn Linh, Quận 7, TP.HCM"
                  value={projLocation}
                  onChange={(e) => setProjLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả dự án
                </label>
                <textarea
                  rows="2"
                  placeholder="Ghi chú về quy mô, mục đích dự án..."
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {!editingProject && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Khởi tạo thiết bị ban đầu
                  </label>
                  <div className="space-y-2">
                    <label className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-0.5 transition-all ${
                      templateMode === 'empty' ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'empty'}
                          onChange={() => setTemplateMode('empty')}
                          className="text-indigo-600"
                        />
                        <span className="text-xs font-bold text-slate-800">Dự án trống hoàn toàn (Khuyên dùng)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 pl-5">
                        Tạo sẵn các tầng cơ bản, chưa có thiết bị nào để bạn tự thêm Switch từ đầu như dự án đầu tiên.
                      </span>
                    </label>

                    <label className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-0.5 transition-all ${
                      templateMode === 'standard' ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'standard'}
                          onChange={() => setTemplateMode('standard')}
                          className="text-indigo-600"
                        />
                        <span className="text-xs font-bold text-slate-800">Khung chuẩn (Core + 2 Switch)</span>
                      </div>
                      <span className="text-[10px] text-slate-500 pl-5">
                        Tạo sẵn 1 Switch Core và 2 Switch Access kết nối Fiber.
                      </span>
                    </label>

                    <label className={`p-3 rounded-xl border cursor-pointer flex flex-col gap-0.5 transition-all ${
                      templateMode === 'clone' ? 'border-indigo-500 bg-indigo-50/50 ring-2 ring-indigo-500/20' : 'border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="projTemplate"
                          checked={templateMode === 'clone'}
                          onChange={() => setTemplateMode('clone')}
                          className="text-indigo-600"
                        />
                        <span className="text-xs font-bold text-slate-800">Sao chép mẫu</span>
                      </div>
                      <span className="text-[10px] text-slate-500 pl-5">
                        Sao chép toàn bộ thiết bị Switch từ Dự án Trung Tâm sang.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingProj}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingProj ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-xs"></i>
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check text-xs"></i>
                      {editingProject ? 'Lưu Thay Đổi' : 'Tạo Dự Án & Bắt Đầu Thêm Thiết Bị'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: THÊM / SỬA SWITCH TRỰC TIẾP CHO DỰ ÁN */}
      {isSwitchModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-black text-slate-800 text-base flex items-center gap-2">
                  <i className="fas fa-server text-emerald-600"></i>
                  {editingSwitch ? 'Chỉnh Sửa Switch' : 'Thêm Switch Mới Vào Dự Án'}
                </h3>
                <p className="text-[11px] text-indigo-700 font-bold mt-0.5">
                  Dự án: {currentInspectProject.name} (ID: {inspectProjId})
                </p>
              </div>
              <button
                onClick={() => setIsSwitchModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xs transition-colors cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSaveSwitch} className="p-6 space-y-4">
              {switchFormError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
                  <i className="fas fa-triangle-exclamation"></i>
                  {switchFormError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên Switch <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: SW-CORE-01"
                    value={swName}
                    onChange={(e) => setSwName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    IP Quản Trị <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 192.168.1.10"
                    value={swIp}
                    onChange={(e) => setSwIp(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-indigo-700 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hãng Sản Xuất
                  </label>
                  <select
                    value={swBrand}
                    onChange={(e) => setSwBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    {brandOptions.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Model
                  </label>
                  <input
                    type="text"
                    placeholder="VD: CBS350-24T, RG-NBS3100..."
                    value={swModel}
                    onChange={(e) => setSwModel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:border-indigo-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tầng / Vị Trí Lắp Đặt
                  </label>
                  <select
                    value={swFloor}
                    onChange={(e) => setSwFloor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    {(projectFloors || []).map(f => (
                      <option key={f.floor} value={f.floor}>{f.floor}</option>
                    ))}
                    <option value="__custom__">+ Nhập tầng mới...</option>
                  </select>
                  {swFloor === '__custom__' && (
                    <input
                      type="text"
                      placeholder="Gõ tên tầng mới..."
                      value={swCustomFloor}
                      onChange={(e) => setSwCustomFloor(e.target.value)}
                      className="w-full mt-1.5 px-3 py-1.5 bg-white border border-indigo-300 rounded-lg text-xs font-medium outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số Cổng (Ports)
                  </label>
                  <select
                    value={swPorts}
                    onChange={(e) => setSwPorts(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none cursor-pointer"
                  >
                    <option value={8}>8 Ports</option>
                    <option value={16}>16 Ports</option>
                    <option value={24}>24 Ports</option>
                    <option value={48}>48 Ports</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kiểu Switch
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['core', 'distribution', 'access'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSwType(type)}
                      className={`py-2 text-xs font-bold rounded-xl border capitalize cursor-pointer transition-all ${
                        swType === type
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSwitchModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingSwitch}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingSwitch ? (
                    <>
                      <i className="fas fa-spinner fa-spin text-xs"></i>
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check text-xs"></i>
                      {editingSwitch ? 'Cập Nhật Switch' : 'Thêm Vào Dự Án Này'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
