/**
 * Initial Default Data for fresh deployments
 */
export const DEFAULT_RACKS = [
  {
    id: 'rack-core',
    name: 'Tủ Core MDF',
    floor: 'Phòng Server Tầng 1',
    switches: [
      {
        id: 'sw-core-01',
        isCore: true,
        name: 'Core-SW01-Nexus',
        brand: 'Cisco',
        mac: '00:1A:2B:3C:4D:01',
        ip: '10.195.32.1',
        model: 'Catalyst 9500-24Y4C',
        zone: 'Server Room',
        ports: 24,
        sfpPorts: 4,
        hybridPortCount: 0,
        hybridPorts: {},
        uplinkPort: 24,
        uplinkTarget: 'none',
        targetPort: 0,
        uplinkType: 'Fiber',
        uplinkSpeed: '40G',
        conns: [
          { p: 1, v: 111, n: 'DC-Server-AD01', ip: '10.195.109.10', mac: '00:50:56:A1:01:01', status: 'active', icon: 'fa-server' },
          { p: 2, v: 111, n: 'DC-Server-DB01', ip: '10.195.109.20', mac: '00:50:56:A1:01:02', status: 'active', icon: 'fa-server' },
          { p: 3, v: 120, n: 'NVR-Central-01', ip: '172.16.4.10', mac: '00:16:3E:45:10:01', status: 'active', icon: 'fa-video', nvr: 'NVR-01', ch: 1, camType: 'PTZ' },
          { p: 4, v: 1, n: 'Firewall-FortiGate', ip: '10.195.32.254', mac: '70:4C:A5:11:22:33', status: 'active', icon: 'fa-shield-halved' }
        ],
        logs: [
          { time: '08:00 - 01/01/2026', user: 'system', msg: 'Khởi tạo Switch Core chính' }
        ]
      },
      {
        id: 'sw-mdf-acc01',
        isCore: false,
        name: 'SW-MDF-Access01',
        brand: 'Cisco',
        mac: '00:1A:2B:3C:4D:02',
        ip: '10.195.32.11',
        model: 'Catalyst 2960X-48TD-L',
        zone: 'MDF Rack A1',
        ports: 48,
        sfpPorts: 4,
        hybridPortCount: 0,
        hybridPorts: {},
        uplinkPort: 48,
        uplinkTarget: 'sw-core-01',
        targetPort: 23,
        uplinkType: 'Fiber',
        uplinkSpeed: '10G',
        conns: [
          { p: 1, v: 114, n: 'PC-Admin-IT', ip: '10.50.24.15', mac: 'E4:54:E8:22:33:44', status: 'active', icon: 'fa-desktop' },
          { p: 2, v: 150, n: 'Phone-IT-Support', ip: '172.16.16.101', mac: '00:0B:82:11:22:33', status: 'active', icon: 'fa-phone' },
          { p: 3, v: 102, n: 'AP-ServerRoom', ip: '10.195.104.10', mac: '20:4C:03:55:66:77', status: 'active', icon: 'fa-wifi' },
          { p: 4, v: 120, n: 'Cam-ServerRoom-Door', ip: '172.16.4.15', mac: '44:19:B6:88:99:AA', status: 'active', icon: 'fa-video', nvr: 'NVR-01', ch: 2, camType: 'Dome' }
        ],
        logs: [
          { time: '08:30 - 01/01/2026', user: 'system', msg: 'Kết nối Uplink lên Core-SW01-Nexus' }
        ]
      }
    ]
  },
  {
    id: 'rack-tang2',
    name: 'Tủ Rack IDF Tầng 2',
    floor: 'Tầng 2 - Khối Khách sạn',
    switches: [
      {
        id: 'sw-fl02-acc01',
        isCore: false,
        name: 'SW-T2-East',
        brand: 'Aruba',
        mac: '00:24:D7:99:88:01',
        ip: '10.195.32.22',
        model: 'Aruba 2930F-48G',
        zone: 'Hành lang phía Đông Tầng 2',
        ports: 48,
        sfpPorts: 4,
        hybridPortCount: 0,
        hybridPorts: {},
        uplinkPort: 48,
        uplinkTarget: 'sw-core-01',
        targetPort: 22,
        uplinkType: 'Fiber',
        uplinkSpeed: '10G',
        conns: [
          { p: 1, v: 102, n: 'AP-T2-Corridor01', ip: '10.195.104.21', mac: '20:4C:03:11:22:01', status: 'active', icon: 'fa-wifi' },
          { p: 2, v: 102, n: 'AP-T2-Corridor02', ip: '10.195.104.22', mac: '20:4C:03:11:22:02', status: 'active', icon: 'fa-wifi' },
          { p: 5, v: 120, n: 'Cam-T2-ElevatorLobby', ip: '172.16.4.31', mac: '44:19:B6:33:44:01', status: 'active', icon: 'fa-video', nvr: 'NVR-01', ch: 3, camType: 'Dome' },
          { p: 6, v: 120, n: 'Cam-T2-Stairway', ip: '172.16.4.32', mac: '44:19:B6:33:44:02', status: 'active', icon: 'fa-video', nvr: 'NVR-01', ch: 4, camType: 'Bullet' }
        ],
        logs: [
          { time: '09:00 - 01/01/2026', user: 'system', msg: 'Khởi tạo Switch tầng 2' }
        ]
      }
    ]
  }
];
