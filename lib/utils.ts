export function sanitizeFilename(name: string) {
  const withoutPath = name.replace(/[/\\]/g, "");
  const cleaned = withoutPath.trim().replace(/[^\w.\-]/g, "_");
  return cleaned.slice(0, 120);
}

export function withUniqueSuffix(base: string) {
  const idx = base.lastIndexOf(".");
  const stamp = Date.now();
  if (idx === -1) return `${base}-${stamp}`;
  const name = base.slice(0, idx);
  const ext = base.slice(idx);
  return `${name}-${stamp}${ext}`;
}
