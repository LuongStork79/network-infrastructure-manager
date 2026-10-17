import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /.*index-QE6I14Fy\.js$/,
        replacement: path.resolve(__dirname, 'src/core/app-bundle.js')
      },
      {
        find: /.*jsx-runtime-BbbE9Oaj\.js$/,
        replacement: path.resolve(__dirname, 'src/core/jsx-runtime-BbbE9Oaj.js')
      },
      {
        find: /.*elevator-BpwH_0-s\.js$/,
        replacement: path.resolve(__dirname, 'src/core/elevator-BpwH_0-s.js')
      },
      {
        find: /.*reportClasses-Dlg0NGLS\.js$/,
        replacement: path.resolve(__dirname, 'src/core/reportClasses-Dlg0NGLS.js')
      },
      {
        find: /.*Vlan120Picker-mRn3H8_7\.js$/,
        replacement: path.resolve(__dirname, 'src/core/Vlan120Picker-mRn3H8_7.js')
      },
      {
        find: /.*MultiSelectDropdown-CobGdMgk\.js$/,
        replacement: path.resolve(__dirname, 'src/core/MultiSelectDropdown-CobGdMgk.js')
      },
      {
        find: /.*BackupHistoryModal-DIkefmZZ\.js$/,
        replacement: path.resolve(__dirname, 'src/core/BackupHistoryModal-DIkefmZZ.js')
      },
      {
        find: /.*IPPhoneManageModal-BCWkf8ne\.js$/,
        replacement: path.resolve(__dirname, 'src/core/IPPhoneManageModal-BCWkf8ne.js')
      },
      {
        find: /.*GponFrameManageModal-N7lwuioW\.js$/,
        replacement: path.resolve(__dirname, 'src/core/GponFrameManageModal-N7lwuioW.js')
      },
      {
        find: /.*PortConfigModal-COc9Vbe5\.js$/,
        replacement: path.resolve(__dirname, 'src/core/PortConfigModal-COc9Vbe5.js')
      },
      {
        find: /.*SwitchManageModal-Dsjh_PLT\.js$/,
        replacement: path.resolve(__dirname, 'src/core/SwitchManageModal-Dsjh_PLT.js')
      },
      {
        find: /.*FirewallManageModal-PTkT46yr\.js$/,
        replacement: path.resolve(__dirname, 'src/core/FirewallManageModal-PTkT46yr.js')
      },
      {
        find: /.*ReportModal-B7J25k7g\.js$/,
        replacement: path.resolve(__dirname, 'src/core/ReportModal-B7J25k7g.js')
      },
      {
        find: /.*TopologyView-CohcYaHY\.js$/,
        replacement: path.resolve(__dirname, 'src/core/TopologyView-CohcYaHY.js')
      },
      {
        find: /.*CctvView-Dz3hQdDk\.js$/,
        replacement: path.resolve(__dirname, 'src/core/CctvView-Dz3hQdDk.js')
      },
      {
        find: /.*ODFView-RwVvGZLW\.js$/,
        replacement: path.resolve(__dirname, 'src/core/ODFView-RwVvGZLW.js')
      },
      {
        find: /.*WifiView-CmwptbpP\.js$/,
        replacement: path.resolve(__dirname, 'src/core/WifiView-CmwptbpP.js')
      },
      {
        find: /.*IPPhoneView-e1sz-BpF\.js$/,
        replacement: path.resolve(__dirname, 'src/core/IPPhoneView-e1sz-BpF.js')
      },
      {
        find: /.*GponView-BCRWRoUC\.js$/,
        replacement: path.resolve(__dirname, 'src/core/GponView-BCRWRoUC.js')
      },
      {
        find: /.*IPAMView-Dnlu12F5\.js$/,
        replacement: path.resolve(__dirname, 'src/core/IPAMView-Dnlu12F5.js')
      },
      {
        find: /.*ElevatorView-B4VxSDnA\.js$/,
        replacement: path.resolve(__dirname, 'src/core/ElevatorView-B4VxSDnA.js')
      },
      {
        find: /.*DeviceInventoryView-C5NLLhMO\.js$/,
        replacement: path.resolve(__dirname, 'src/core/DeviceInventoryView-C5NLLhMO.js')
      },
      {
        find: /.*UserManagementView-axupMBQ3\.js$/,
        replacement: path.resolve(__dirname, 'src/core/UserManagementView-axupMBQ3.js')
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    port: 3000,
    strictPort: true,
    open: true
  }
});
