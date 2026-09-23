// Split PDF text into bounded, overlapping passages without stalling at the tail.
export function chunkText(text: string, size = 750, overlap = 100): string[] {
  if (!Number.isInteger(size) || !Number.isInteger(overlap) || size <= 0 || overlap < 0 || overlap >= size) {
    throw new RangeError("Expected integer size > overlap >= 0");
  }
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= size) return clean ? [clean] : [];
  const chunks: string[] = [];
  let start = 0;
  while (start < clean.length) {
    let end = Math.min(start + size, clean.length);
    if (end < clean.length) {
      const dot = clean.lastIndexOf(". ", end - 1);
      const space = clean.lastIndexOf(" ", end);
      const minimum = start + Math.max(overlap, size * 0.6);
      if (dot + 1 > minimum) end = dot + 1;
      else if (space > minimum) end = space;
    }
    chunks.push(clean.slice(start, end).trim());
    if (end === clean.length) break;
    start = end - overlap;
  }
  return chunks.filter(Boolean);
}
