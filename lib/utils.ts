import { cloneDeep, debounce } from "lodash";

/**
 * Utility functions for the application
 */

/**
 * Deep clone an object using Lodash
 * @param obj - Object to clone
 * @returns Deep cloned object
 */
export function deepClone<T>(obj: T): T {
  return cloneDeep(obj);
}

/**
 * Create a debounced function using Lodash
 * @param func - Function to debounce
 * @param wait - Milliseconds to wait
 * @returns Debounced function
 */
export function createDebounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number = 300,
) {
  return debounce(func, wait);
}

/**
 * Format a date to a readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format a date to include time
 * @param date - Date to format
 * @returns Formatted date and time string
 */
export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Generate a random room name for meetings
 * @returns Random room name
 */
export function generateRoomName(): string {
  const adjectives = ["quick", "bright", "calm", "bold", "smart"];
  const nouns = ["tiger", "eagle", "river", "mountain", "ocean"];
  const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${randomAdj}-${randomNoun}-${randomNum}`;
}

/**
 * Truncate text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}
