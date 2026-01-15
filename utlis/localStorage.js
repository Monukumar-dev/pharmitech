// utils/localStorage.js

// Check if running in browser (to prevent SSR errors)
const isBrowser = () => typeof window !== "undefined";

/**
 * Save data to localStorage
 * @param {string} key
 * @param {*} value
 */
export const setLocalStorageItem = (key, value) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage item:", error);
  }
};

/**
 * Get data from localStorage
 * @param {string} key
 * @param {*} defaultValue - fallback value if not found
 */
export const getLocalStorageItem = (key, defaultValue = null) => {
  if (!isBrowser()) return defaultValue;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error("Error getting localStorage item:", error);
    return defaultValue;
  }
};

/**
 * Remove an item from localStorage
 * @param {string} key
 */
export const removeLocalStorageItem = (key) => {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing localStorage item:", error);
  }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = () => {
  if (!isBrowser()) return;
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};
