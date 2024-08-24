// localStorageUtil.js

// Function to set an item in localStorage (for JSON objects or other types)
export const setItem = (key, value) => {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error(`Error setting item in localStorage: ${error}`);
    }
};

// Function to get an item from localStorage (parsing as JSON)
export const getItem = (key) => {
    try {
        const serializedValue = localStorage.getItem(key);
        if (serializedValue === null) {
            return undefined;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error(`Error getting item from localStorage: ${error}`);
        return undefined;
    }
};

// Function to remove an item from localStorage
export const removeItem = (key) => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error(`Error removing item from localStorage: ${error}`);
    }
};

// Function to clear all items from localStorage
export const clearStorage = () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.error(`Error clearing localStorage: ${error}`);
    }
};
