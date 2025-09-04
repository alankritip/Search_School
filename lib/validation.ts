export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(v: string) {
  return emailRegex.test(v);
}

export function isValidContact(v: string) {
  return /^[0-9+\-\s()]{7,20}$/.test(v);
}

export const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
