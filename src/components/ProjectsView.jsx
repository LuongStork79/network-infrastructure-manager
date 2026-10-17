import React, { useState, useEffect } from 'react';
import {
  getProjectsList,
  getActiveProjectId,
  setActiveProjectId,
  addProject,
  updateProject,
  deleteProject
} from '../services/projectManager';

export default function ProjectsView({ onBack }) {
  const [projects, setProjects] = useState(getProjectsList());
  const [activeId, setActiveIdState] = useState(getActiveProjectId());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Form states
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

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

  function handleOpenAdd() {
    setEditingProject(null);
    setName('');
    setDesc('');
    setLocation('');
    setError('');
    setIsModalOpen(true);
  }

  function handleOpenEdit(proj) {
    setEditingProject(proj);
    setName(proj.name);
    setDesc(proj.desc || '');
    setLocation(proj.location || '');
    setError('');
    setIsModalOpen(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập tên dự án!');
      return;
    }

    if (editingProject) {
      updateProject(editingProject.id, { name, desc, location });
    } else {
      const created = addProject({ name, desc, location });
      // Tự động kích hoạt dự án mới tạo nếu muốn
      setActiveProjectId(created.id);
    }
    setProjects(getProjectsList());
    setActiveIdState(getActiveProjectId());
    setIsModalOpen(false);
  }

  function handleSelect(id) {
    setActiveProjectId(id);
    setActiveIdState(id);
  }

  function handleDelete(proj) {
    if (proj.isDefault || proj.id === 'default') {
      alert('Không thể xóa dự án mặc định của hệ thống!');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa dự án "${proj.name}" không?\nDữ liệu cấu hình của dự án này sẽ bị xóa.`)) {
      try {
        deleteProject(proj.id);
        setProjects(getProjectsList());
        setActiveIdState(getActiveProjectId());
      } catch (err) {
        alert(err.message);
      }
    }
  }

  return (
    <div className="view-container flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* Header */}
      <div className="view-header px-8 py-6 border-b border-slate-200 bg-white shadow-sm flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-100 text-lg">
            <i className="fas fa-folder-tree"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              Quản Lý Dự Án (Projects)
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                {projects.length} Dự án
              </span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Phân tách độc lập hạ tầng mạng, thiết bị Switch, CCTV, WiFi và IPAM theo từng công trình / chi nhánh
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Thêm Dự Án Mới
          </button>
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
            >
              <i className="fas fa-arrow-left"></i>
              Quay lại Topology
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="flex-1 overflow-y-auto custom-scroll p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const isActive = proj.id === activeId;
              return (
                <div
                  key={proj.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 p-6 flex flex-col justify-between relative overflow-hidden ${
                    isActive
                      ? 'border-indigo-500 shadow-xl shadow-indigo-100/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Top Bar Status */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <i className="fas fa-building"></i>
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-800 text-base leading-snug line-clamp-1">
                          {proj.name}
                        </h3>
                        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                          <i className="fas fa-location-dot text-[10px]"></i>
                          {proj.location || 'Chưa cập nhật'}
                        </span>
                      </div>
                    </div>

                    {isActive && (
                      <span className="shrink-0 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full border border-emerald-200 flex items-center gap-1 uppercase tracking-wider">
                        <i className="fas fa-circle-check text-[10px]"></i>
                        Đang chọn
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed min-h-[36px] line-clamp-2 mb-6">
                    {proj.desc || 'Không có mô tả chi tiết cho dự án này.'}
                  </p>

                  {/* Metadata */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium mb-6">
                    <span>
                      <i className="fas fa-calendar-alt mr-1.5 text-slate-300"></i>
                      Tạo ngày: {proj.createdAt || 'N/A'}
                    </span>
                    <span className="font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100 text-slate-500">
                      ID: {proj.id}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    {isActive ? (
                      <button
                        disabled
                        className="flex-1 py-2.5 bg-emerald-600/10 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-default"
                      >
                        <i className="fas fa-check"></i>
                        Đang làm việc
                      </button>
                    ) : (
                      <button
                        onClick={() => handleSelect(proj.id)}
                        className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <i className="fas fa-arrow-right-to-bracket"></i>
                        Chọn dự án này
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenEdit(proj)}
                      className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl border border-slate-200 transition-all text-xs"
                      title="Chỉnh sửa thông tin dự án"
                    >
                      <i className="fas fa-edit"></i>
                    </button>

                    {!proj.isDefault && proj.id !== 'default' && (
                      <button
                        onClick={() => handleDelete(proj)}
                        className="p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl border border-rose-200 transition-all text-xs"
                        title="Xóa dự án"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal Thêm / Chỉnh Sửa Dự Án */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                <i className="fas fa-folder-plus text-indigo-600"></i>
                {editingProject ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-all text-xs"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2">
                  <i className="fas fa-exclamation-circle"></i>
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Tên dự án *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="VD: Chi nhánh Quận 7, Khách sạn Mường Thanh..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Vị trí / Địa điểm
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VD: Tòa nhà Landmark 81, TP.HCM"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5">
                  Mô tả dự án
                </label>
                <textarea
                  rows="3"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Mô tả quy mô hạ tầng, số tầng, phạm vi triển khai..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <i className="fas fa-save"></i>
                  {editingProject ? 'Lưu Thay Đổi' : 'Tạo Dự Án'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
