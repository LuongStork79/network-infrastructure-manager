/**
 * MAC Address formatting utility
 */
export function formatMacAddress(value) {
  if (!value) return '';
  let clean = value.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
  if (clean.length > 12) clean = clean.slice(0, 12);
  return clean.match(/.{1,2}/g)?.join(':') ?? '';
}

// Aliases for compatibility with build chunks
export const t = formatMacAddress;
export default formatMacAddress;
