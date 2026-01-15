import { getLocalStorageItem, setLocalStorageItem } from "./localStorage";

/**
 * Generate or retrieve a guest token (frontend only)
 * No backend call needed
 */
export function getOrCreateGuestToken() {
  let token = getLocalStorageItem("guest_token");

  if (token) {
    return token; // ✅ already exists
  }

  // Generate a random UUID-like token
  token = `guest_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;

  // Save it in localStorage
  setLocalStorageItem("guest_token", token);

  console.log("🆕 Guest token generated:", token);
  return token;
}
