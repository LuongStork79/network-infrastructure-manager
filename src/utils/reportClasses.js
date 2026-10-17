/**
 * Theme & Color mapping for Reports & Device Icons
 */
const colorClasses = {
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600' },
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600' },
  blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-600' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-100', text: 'text-cyan-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-600' },
  red: { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-600' },
  green: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600' },
  fuchsia: { bg: 'bg-fuchsia-50', border: 'border-fuchsia-100', text: 'text-fuchsia-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-600' },
  slate: { bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-500' }
};

export function getColorClasses(name) {
  return colorClasses[name] ?? colorClasses.slate;
}

const iconColorClasses = {
  indigo: { bg: 'bg-indigo-50 border-indigo-100', iconBg: 'bg-indigo-100', iconText: 'text-indigo-500' },
  red: { bg: 'bg-red-50 border-red-100', iconBg: 'bg-red-100', iconText: 'text-red-500' },
  cyan: { bg: 'bg-cyan-50 border-cyan-100', iconBg: 'bg-cyan-100', iconText: 'text-cyan-500' },
  green: { bg: 'bg-green-50 border-green-100', iconBg: 'bg-green-100', iconText: 'text-green-500' },
  amber: { bg: 'bg-amber-50 border-amber-100', iconBg: 'bg-amber-100', iconText: 'text-amber-500' },
  blue: { bg: 'bg-blue-50 border-blue-100', iconBg: 'bg-blue-100', iconText: 'text-blue-500' },
  purple: { bg: 'bg-purple-50 border-purple-100', iconBg: 'bg-purple-100', iconText: 'text-purple-500' },
  fuchsia: { bg: 'bg-fuchsia-50 border-fuchsia-100', iconBg: 'bg-fuchsia-100', iconText: 'text-fuchsia-500' },
  slate: { bg: 'bg-slate-50 border-slate-100', iconBg: 'bg-slate-100', iconText: 'text-slate-500' }
};

const iconMapping = {
  'fa-desktop': 'indigo',
  'fa-video': 'red',
  'fa-wifi': 'cyan',
  'fa-phone': 'green',
  'fa-print': 'amber',
  'fa-server': 'blue',
  'fa-microchip': 'purple',
  'fa-network-wired': 'slate',
  'fa-diagram-project': 'fuchsia',
  'fa-hdd': 'orange',
  'fa-shield-halved': 'orange',
  'fa-box': 'amber'
};

export function getIconColorClasses(icon) {
  return iconColorClasses[iconMapping[icon] ?? 'slate'] ?? iconColorClasses.slate;
}

// Chunks compatibility aliases
export const n = getColorClasses;
export const t = getIconColorClasses;
export default { getColorClasses, getIconColorClasses };
