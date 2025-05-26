/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Recursively normalizes a JSON object:
 * - Parses JSON strings into objects or arrays if applicable.
 * - Converts numeric strings into numbers.
 * - Handles nested objects and arrays.
 * - Returns all other values as they are.
 *
 * @param data - The input data to be normalized (object or JSON string).
 * @returns The normalized object with correct data types.
 */

export function unpackJsonData<T>(data: any): T {
  // If input is a JSON string, parse it into an object/array
  if (isJsonString(data)) {
    console.log("Parsing JSON string:", data);
    data = JSON.parse(data);
  }

  if (isArray(data)) {
    console.log("Processing array:", data);
    return data.map((item: any, index: number) => {
      console.log(`Array item ${index}:`, item, "Type:", typeof item);
      return unpackJsonData(item);
    }) as T;
  }

  if (isObject(data)) {
    console.log("Processing object:", data);
    const result: any = {};
    for (const [key, value] of Object.entries(data)) {
      console.log(`Object key ${key}:`, value, "Type:", typeof value);
      if (isJsonString(value)) {
        result[key] = JSON.parse(value as string);
      } else if (isNumericString(value)) {
        result[key] = Number(value);
      } else if (isObject(value) || isArray(value)) {
        result[key] = unpackJsonData(value);
      } else {
        result[key] = value; // Keep primitive values as they are
      }
    }
    return result as T;
  }

  // Return primitive values unchanged
  console.log("Returning primitive:", data, "Type:", typeof data);
  return data as T;
}

// Checks if a value is an object (but not an array or null).
function isObject(value: unknown): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

// Checks if a value is an array.
function isArray(value: unknown): boolean {
  return Array.isArray(value);
}

// Checks if a value is a string.
function isString(value: unknown): boolean {
  return typeof value === "string";
}

// Checks if a value is a numeric string (integer or decimal).
function isNumericString(value: unknown): boolean {
  if (!isString(value)) return false;
  const str = value as string;
  return /^\d+(\.\d+)?$/.test(str);
}

// Checks if a value is a JSON string.
function isJsonString(value: unknown): boolean {
  if (!isString(value)) return false;
  const str = value as string;

  // Skip if it's just a number or simple string
  if (!/^[\{\[]/.test(str.trim())) return false;

  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch {
    return false;
  }
}
