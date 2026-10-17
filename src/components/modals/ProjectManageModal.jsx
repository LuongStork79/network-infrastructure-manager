import React, { useState, useEffect } from 'react';
import {
  getProjectsList,
  getActiveProjectId,
  getActiveProject,
  setActiveProjectId,
  addProject,
  updateProject,
  deleteProject
} from '../../services/projectManager.js';

export default function ProjectManageModal({
  isOpen,
  onClose,
  db = [],
  username = 'system',
  onOpenAddSwitch,
  onOpenEditSwitch,
  onDeleteSwitch,
  showDialog
}) {
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'add' | 'devices'
  const [projects, setProjects] = useState(getProjectsList());
  const [activeId, setActiveIdState] = useState(getActiveProjectId());
  const [activeProj, setActiveProjState] = useState(getActiveProject());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [switchingId, setSwitchingId] = useState(null);

  // Edit project state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editLocation, setEditLocation] = useState('');

  // Add project form
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTemplate, setNewTemplate] = useState('empty'); // 'empty' | 'standard' | 'clone'
  const [formError, setFormError] = useState('');

  useEffect(() => {
    function refresh() {
      setProjects(getProjectsList());
      setActiveIdState(getActiveProjectId());
      setActiveProjState(getActiveProject());
    }
    window.addEventListener('nim:projects_updated', refresh);
    window.addEventListener('nim:project_changed', refresh);
    return () => {
      window.removeEventListener('nim:projects_updated', refresh);
      window.removeEventListener('nim:project_changed', refresh);
    };
  }, []);

  if (!isOpen) return null;

  // Flatten all switches from active project DB
  const projectSwitches = [];
  (db || []).forEach(f => {
    (f.switches || []).forEach(s => {
      projectSwitches.push({ ...s, floorName: f.floor });
    });
  });

  async function handleSwitchProject(id) {
    if (id === activeId) return;
    setSwitchingId(id);
    const target = projects.find(p => p.id === id);
    if (showDialog) {
      showDialog(`Đang chuyển sang làm việc trên dự án "${target?.name || id}"...`, 'info');
    }
    setTimeout(() => {
      setActiveProjectId(id, { reload: true });
    }, 400);
  }

  function handleStartEdit(proj) {
    setEditingId(proj.id);
    setEditName(proj.name);
    setEditDesc(proj.desc || '');
    setEditLocation(proj.location || '');
  }

  function handleSaveEdit(e) {
    e.preventDefault();
    if (!editName.trim()) return;
    updateProject(editingId, {
      name: editName,
      desc: editDesc,
      location: editLocation
    });
    setEditingId(null);
    setProjects(getProjectsList());
    setActiveProjState(getActiveProject());
    if (showDialog) {
      showDialog('Đã cập nhật thông tin dự án thành công!', 'success');
    }
  }

  async function handleDelete(proj) {
    if (proj.isDefault || proj.id === 'default') {
      if (showDialog) {
        showDialog('Không thể xóa dự án Trung Tâm mặc định của hệ thống!', 'error');
      } else {
        alert('Không thể xóa dự án mặc định của hệ thống!');
      }
      return;
    }

    const confirmMsg = `Bạn có chắc chắn muốn xóa toàn bộ dự án "${proj.name}" không?\n\n⚠️ Tất cả dữ liệu thiết bị Switch, CCTV, WiFi, IPAM của dự án này sẽ bị xóa khỏi Google Cloud Firestore.`;
    
    if (showDialog) {
      showDialog(confirmMsg, 'confirm', async () => {
        try {
          await deleteProject(proj.id);
          setProjects(getProjectsList());
          setActiveIdState(getActiveProjectId());
          setActiveProjState(getActiveProject());
          showDialog(`Đã xóa dự án "${proj.name}" thành công!`, 'success');
        } catch (err) {
          showDialog(err.message || 'Lỗi khi xóa dự án', 'error');
        }
      });
    } else {
      if (confirm(confirmMsg)) {
        await deleteProject(proj.id);
        setProjects(getProjectsList());
        setActiveIdState(getActiveProjectId());
        setActiveProjState(getActiveProject());
      }
    }
  }

  async function handleCreateProject(e) {
    e.preventDefault();
    if (!newName.trim()) {
      setFormError('Vui lòng nhập tên dự án!');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const created = await addProject({
        name: newName,
        desc: newDesc,
        location: newLocation,
        templateMode: newTemplate
      });

      setNewName('');
      setNewDesc('');
      setNewLocation('');
      setNewTemplate('empty');
      setProjects(getProjectsList());

      if (showDialog) {
        showDialog(`Đã tạo dự án "${created.name}" thành công! Đang chuyển vào dự án...`, 'success');
      }

      setTimeout(() => {
        setActiveProjectId(created.id, { reload: true });
      }, 600);
    } catch (err) {
      setFormError(err.message || 'Lỗi khi tạo dự án mới');
      setIsSubmitting(false);
    }
  }

  function handleTriggerAddSwitch() {
    onClose();
    if (onOpenAddSwitch) {
      onOpenAddSwitch();
    }
  }

  function handleTriggerEditSwitch(switchId) {
    onClose();
    if (onOpenEditSwitch) {
      onOpenEditSwitch(switchId);
    }
  }

  function handleTriggerDeleteSwitch(sw) {
    if (showDialog && onDeleteSwitch) {
      showDialog(`Bạn có chắc chắn muốn xóa thiết bị "${sw.name}" khỏi dự án này?`, 'confirm', () => {
        onDeleteSwitch(sw.id, username);
      });
    }
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-base shadow-md shadow-indigo-200">
              <i className="fas fa-folder-tree"></i>
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-base font-black text-slate-800 tracking-tight">
                  Quản Lý Đa Dự Án & Thiết Bị
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider flex items-center gap-1">
                  <i className="fas fa-circle text-[6px] text-emerald-500 animate-pulse"></i>
                  Đang chọn: {activeProj?.name || 'Trung Tâm'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                Thêm dự án mới, chuyển đổi dự án làm việc và quản lý thiết bị mạng độc lập cho từng công trình
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer text-xs"
            title="Đóng"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Tab Bar */}
        <div className="flex items-center px-6 border-b border-slate-200 bg-white gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('list')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'list'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-list-check"></i>
            Danh Sách Dự Án
            <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-600">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('add')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'add'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-folder-plus text-indigo-500"></i>
            + Thêm Dự Án Mới
          </button>

          <button
            onClick={() => setActiveTab('devices')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'devices'
                ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <i className="fas fa-network-wired text-emerald-500"></i>
            Thiết Bị Của Dự Án Này
            <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700">
              {projectSwitches.length} Switch
            </span>
          </button>
        </div>

        {/* Modal Content Area */}
        <div className="flex-1 overflow-y-auto custom-scroll p-6 bg-slate-50/50">
          {/* TAB 1: DANH SÁCH DỰ ÁN */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-600">
                  Chọn dự án để tải sơ đồ Switch, WiFi, CCTV và IPAM tương ứng:
                </span>
                <button
                  onClick={() => setActiveTab('add')}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <i className="fas fa-plus"></i>
                  Tạo Dự Án Mới
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => {
                  const isActive = proj.id === activeId;
                  const isEditing = editingId === proj.id;
                  const isSwitching = switchingId === proj.id;

                  return (
                    <div
                      key={proj.id}
                      className={`bg-white rounded-2xl border p-5 transition-all flex flex-col justify-between relative ${
                        isActive
                          ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                          : 'border-slate-200 hover:border-slate-300 shadow-xs'
                      }`}
                    >
                      {/* Top Header Card */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                              isActive
                                ? 'bg-indigo-600 text-white shadow-xs'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <i className="fas fa-building"></i>
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-800 text-sm leading-tight">
                              {proj.name}
                            </h4>
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                              <i className="fas fa-location-dot text-[9px]"></i>
                              {proj.location || 'Chưa cập nhật vị trí'}
                            </span>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="shrink-0 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1">
                            <i className="fas fa-check-circle"></i>
                            Đang làm việc
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSwitchProject(proj.id)}
                            disabled={isSwitching}
                            className="shrink-0 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-all flex items-center gap-1 cursor-pointer"
                          >
                            <i className={`fas ${isSwitching ? 'fa-spinner fa-spin' : 'fa-arrow-right-to-bracket'}`}></i>
                            Chọn làm việc
                          </button>
                        )}
                      </div>

                      {/* Description / Edit Form */}
                      {isEditing ? (
                        <form onSubmit={handleSaveEdit} className="my-2 space-y-2.5 p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase">Tên dự án *</label>
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-bold text-slate-800 outline-none focus:border-indigo-500"
                              autoFocus
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase">Vị trí</label>
                            <input
                              type="text"
                              value={editLocation}
                              onChange={(e) => setEditLocation(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 outline-none focus:border-indigo-500"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black text-slate-400 uppercase">Mô tả</label>
                            <textarea
                              rows="2"
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-700 outline-none focus:border-indigo-500 resize-none"
                            ></textarea>
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-200 rounded-lg cursor-pointer"
                            >
                              Hủy
                            </button>
                            <button
                              type="submit"
                              className="px-3 py-1 text-xs font-bold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer shadow-xs"
                            >
                              Lưu thay đổi
                            </button>
                          </div>
                        </form>
                      ) : (
                        <p className="text-xs text-slate-600 line-clamp-2 my-2 min-h-[32px]">
                          {proj.desc || 'Hạ tầng mạng độc lập trên Firebase Firestore.'}
                        </p>
                      )}

                      {/* Card Footer */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-mono text-[10px] bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          ID: {proj.id}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleStartEdit(proj)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 rounded-lg text-xs transition-colors cursor-pointer"
                            title="Sửa thông tin dự án"
                          >
                            <i className="fas fa-pen-to-square"></i>
                          </button>

                          {!proj.isDefault && proj.id !== 'default' && (
                            <button
                              onClick={() => handleDelete(proj)}
                              className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg text-xs transition-colors cursor-pointer"
                              title="Xóa dự án này"
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

          {/* TAB 2: THÊM DỰ ÁN MỚI */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProject} className="max-w-2xl mx-auto space-y-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="border-b border-slate-100 pb-3 mb-4">
                <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                  <i className="fas fa-folder-plus text-indigo-600"></i>
                  Khởi Tạo Dự Án Mới
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mỗi dự án sẽ có cơ sở dữ liệu Switch, WiFi, CCTV, IPAM lưu trữ độc lập trên Firebase Cloud Firestore
                </p>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Tên dự án *
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="VD: Chi nhánh Quận 7, Khách sạn Mường Thanh, Bệnh viện A..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Vị trí / Địa điểm triển khai
                </label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="VD: Tòa nhà Landmark 81, TP. Hồ Chí Minh"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Mô tả dự án
                </label>
                <textarea
                  rows="2"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mô tả phạm vi hạ tầng, số tầng hoặc ghi chú kỹ thuật..."
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              {/* Template Mode Selection */}
              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
                  Khởi tạo thiết bị ban đầu cho dự án:
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      newTemplate === 'empty'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="newTemplate"
                          checked={newTemplate === 'empty'}
                          onChange={() => setNewTemplate('empty')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-black text-slate-800">Dự án trống (Khuyên dùng)</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed pl-5">
                        Tạo sẵn Server Room, Tầng 01-03, chưa có switch nào để bạn tự thêm thiết bị từ đầu.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-indigo-600 mt-2 pl-5">Sẵn sàng thêm mới</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      newTemplate === 'standard'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="newTemplate"
                          checked={newTemplate === 'standard'}
                          onChange={() => setNewTemplate('standard')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-black text-slate-800">Khung chuẩn</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed pl-5">
                        Khởi tạo sẵn 1 Core Switch + 2 Access Switch kết nối Fiber hoạt động sẵn.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 mt-2 pl-5">3 Thiết bị mẫu</span>
                  </label>

                  <label
                    className={`p-3.5 rounded-xl border cursor-pointer flex flex-col justify-between transition-all ${
                      newTemplate === 'clone'
                        ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="newTemplate"
                          checked={newTemplate === 'clone'}
                          onChange={() => setNewTemplate('clone')}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="text-xs font-black text-slate-800">Sao chép mẫu</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed pl-5">
                        Sao chép toàn bộ thiết bị Switch, AP, Camera từ Dự án Trung Tâm sang.
                      </p>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 mt-2 pl-5">Đầy đủ thiết bị</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-rocket'}`}></i>
                  Tạo Dự Án & Bắt Đầu Làm Việc Ngay
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: THIẾT BỊ CỦA DỰ ÁN NÀY */}
          {activeTab === 'devices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
                    <i className="fas fa-server text-indigo-600"></i>
                    Thiết Bị Của Dự Án: <span className="text-indigo-600">{activeProj?.name}</span>
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hiện có <strong className="text-slate-800">{projectSwitches.length} Switch</strong> trong dự án này. Các thao tác thêm, sửa, xóa sẽ chỉ lưu riêng cho dự án này.
                  </p>
                </div>

                <button
                  onClick={handleTriggerAddSwitch}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <i className="fas fa-plus"></i>
                  Thêm Switch Mới Vào Dự Án Này
                </button>
              </div>

              {projectSwitches.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300 p-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto mb-3">
                    <i className="fas fa-network-wired"></i>
                  </div>
                  <h5 className="font-bold text-slate-700 text-sm">Dự án này chưa có thiết bị Switch nào</h5>
                  <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-5">
                    Hãy bấm nút bên dưới để thêm Switch đầu tiên (chọn tầng, hãng, số port và cấu hình Uplink) y như dự án đầu tiên!
                  </p>
                  <button
                    onClick={handleTriggerAddSwitch}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <i className="fas fa-plus"></i>
                    Thêm Thiết Bị Đầu Tiên Cho Dự Án Này
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold text-[10px] uppercase tracking-wider">
                          <th className="py-3 px-4">Tên Thiết Bị</th>
                          <th className="py-3 px-4">Tầng / Vị Trí</th>
                          <th className="py-3 px-4">Hãng & Model</th>
                          <th className="py-3 px-4">Địa Chỉ IP</th>
                          <th className="py-3 px-4">Số Port</th>
                          <th className="py-3 px-4">Uplink</th>
                          <th className="py-3 px-4 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {projectSwitches.map((sw) => (
                          <tr key={sw.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2">
                              {sw.isCore && (
                                <i className="fas fa-crown text-amber-500 text-[10px]" title="Core Switch"></i>
                              )}
                              {sw.name}
                            </td>
                            <td className="py-3 px-4 text-slate-600 font-medium">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                                {sw.floorName}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <span className="font-semibold text-slate-700">{sw.brand || 'Khác'}</span>
                              <span className="text-slate-400 ml-1 text-[11px]">{sw.model || ''}</span>
                            </td>
                            <td className="py-3 px-4 font-mono text-slate-700">
                              {sw.ip || '—'}
                            </td>
                            <td className="py-3 px-4 text-slate-600">
                              <span className="font-bold text-emerald-600">{sw.ports}</span> Port
                              {sw.sfpPorts ? ` + ${sw.sfpPorts} SFP` : ''}
                            </td>
                            <td className="py-3 px-4 text-slate-500 text-[11px]">
                              {sw.uplinkTarget === 'none' ? (
                                <span className="text-slate-400">Node Root</span>
                              ) : (
                                <span className="text-indigo-600 font-medium">
                                  Port {sw.uplinkPort} ({sw.uplinkType || 'Fiber'})
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleTriggerEditSwitch(sw.id)}
                                  className="p-1.5 hover:bg-indigo-50 text-indigo-600 rounded-lg transition-colors cursor-pointer"
                                  title="Chỉnh sửa Switch"
                                >
                                  <i className="fas fa-pen-to-square"></i>
                                </button>
                                <button
                                  onClick={() => handleTriggerDeleteSwitch(sw)}
                                  className="p-1.5 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
                                  title="Xóa Switch này"
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
    </div>
  );
}
