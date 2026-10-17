# Network Infrastructure Manager (Hạ tầng mạng & Thiết bị)

Hệ thống quản lý trực quan và giám sát hạ tầng mạng, tủ Rack, Switch, ODF, CCTV, GPON OLT/ONT, WiFi AP, Thang máy và IP Phone.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

- **Framework & Runtime:** [React 19](https://react.dev/), [Vite 6](https://vitejs.dev/)
- **Quản lý trạng thái (State Management):** [Zustand 5](https://github.com/pmndrs/zustand)
- **Database & Sync:** [Firebase 11](https://firebase.google.com/) (Firestore realtime sync & authentication)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Icon:** FontAwesome 6 Free

---

## 📁 Cấu trúc thư mục nguồn (`src/`)

```
src/
├── components/          # Các thành phần giao diện & Modal chức năng
│   ├── Header.jsx       # Thanh điều hướng trên cùng, zoom scale, tìm kiếm, user status
│   ├── Sidebar.jsx      # Danh sách tủ Rack, bộ lọc VLAN, thiết bị theo rack
│   ├── IconRail.jsx     # Thanh công cụ bên trái (Topology, CCTV, ODF, Wifi, ...)
│   ├── InfoPanel.jsx    # Chi tiết thiết bị & bảng 48/52 port thời gian thực
│   ├── LoginModal.jsx   # Modal đăng nhập nhân viên / admin với avatar mascot tương tác
│   ├── GlobalSearchModal.jsx # Tìm kiếm nhanh toàn hệ thống (Ctrl + K / ⌘K)
│   ├── GlobalLogsModal.jsx   # Nhật ký thao tác hệ thống
│   ├── MultiSelectDropdown.jsx
│   ├── Vlan120Picker.jsx
│   └── modals/          # Các hộp thoại thêm/sửa/cấu hình thiết bị
│       ├── SwitchManageModal.jsx    # Thêm/Sửa switch, cấu hình port combo, uplink
│       ├── PortConfigModal.jsx      # Gán thiết bị, camera NVR, phone, vlan cho port
│       ├── FirewallManageModal.jsx  # Quản lý Firewall HA & đường WAN
│       ├── GponFrameManageModal.jsx # Cấu hình khung OLT, card slot, splitter
│       ├── IPPhoneManageModal.jsx   # Danh bạ IP Phone & cấu hình phòng ban
│       ├── BackupHistoryModal.jsx   # Xem & phục hồi lịch sử backup cấu hình
│       └── ReportModal.jsx          # Báo cáo tổng hợp số lượng & trạng thái hạ tầng
├── views/               # 10 giao diện phân hệ nghiệp vụ
│   ├── TopologyView.jsx         # Sơ đồ kết nối mạng trực quan giữa các switch & core
│   ├── DeviceInventoryView.jsx  # Danh sách kiểm kê toàn bộ thiết bị
│   ├── ODFView.jsx              # Quản lý tủ phối quang ODF & kết nối sợi quang
│   ├── CctvView.jsx             # Sơ đồ camera an ninh, đầu ghi NVR, switch PoE
│   ├── IPAMView.jsx             # Quản lý không gian địa chỉ IP & Subnet
│   ├── WifiView.jsx             # Giám sát Access Point WiFi và vùng phủ sóng
│   ├── IPPhoneView.jsx          # Sơ đồ & danh bạ máy nhánh VoIP
│   ├── ElevatorView.jsx         # Quản lý hệ thống mạng truyền dẫn thang máy
│   ├── GponView.jsx             # Mạng cáp quang thụ động GPON (OLT - Splitter - ONT)
│   └── UserManagementView.jsx   # Quản lý phân quyền tài khoản người dùng
├── stores/              # Zustand Stores lưu trữ trạng thái tập trung
│   ├── useNetworkStore.js       # Store mạng trung tâm (Racks, Switches, Connections, Actions)
│   ├── useUIStore.js            # Store điều khiển UI (View hiện tại, Zoom, Active Device, Search)
│   ├── useDialogStore.js        # Quản lý các popup confirm & thông báo
│   ├── useToastStore.js         # Hệ thống thông báo toast (Success, Error, Info)
│   └── useSandboxStore.js       # Chế độ thử nghiệm cô lập (Sandbox mode)
├── services/            # Kết nối dịch vụ bên ngoài & xử lý nền
│   ├── firebase.js              # Cấu hình kết nối Firebase Firestore
│   ├── dataSync.js              # Đồng bộ 2 chiều thời gian thực (Realtime OnSnapshot / Debounced sync)
│   └── auth.js                  # Cơ chế mã hóa SHA-256 + Salt & xác thực người dùng
├── utils/
│   └── defaultData.js           # Dữ liệu hạ tầng mẫu khi chạy offline / khởi tạo ban đầu
├── core/                        # React runtime & module bridge
├── App.jsx                      # Root Component gắn kết toàn bộ ứng dụng
├── main.jsx                     # Entry point React 19
└── index.css                    # Toàn bộ CSS Tailwind và hiệu ứng hoạt họa
```

---

## 🛠️ Hướng dẫn cài đặt & Khởi chạy

### 1. Cài đặt thư viện dependencies (nếu chưa cài):
```bash
npm install
```

### 2. Chạy môi trường phát triển (Development Server):
```bash
npm run dev
```
> Sau khi chạy, mở trình duyệt tại địa chỉ hiển thị trên terminal (thường là `http://localhost:5173/`).

### 3. Build sản phẩm tối ưu (Production Build):
```bash
npm run build
```
> Kết quả build sẽ nằm trong thư mục `dist/`.

### 4. Xem trước bản build (Preview Production):
```bash
npm run preview
```

---

## 🔐 Thông tin tài khoản đăng nhập (Credentials)

| Tài khoản | Mật khẩu | Quyền hạn (Role) | Mô tả |
| :--- | :--- | :--- | :--- |
| **`admin`** | **`admin123`** | **`admin`** | Quản trị viên (toàn quyền thêm/sửa/xóa switch, rack, phân quyền) |
| **`user`** | **`123456`** | **`viewer`** | Người xem (theo dõi sơ đồ hạ tầng, camera, ODF, switch...) |

