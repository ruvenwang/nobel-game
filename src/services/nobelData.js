/**
 * Service to fetch and manage Nobel Prize data
 */

const API_URL = 'http://api.nobelprize.org/v1/prize.json';

export const fetchNobelPrizes = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.prizes;
    } catch (error) {
        console.error("Could not fetch Nobel Prizes:", error);
        return [];
    }
};

/**
 * Extract all unique categories
 * @param {Array} prizes 
 * @returns {Array} Array of category strings
 */
export const getCategories = (prizes) => {
    const categories = new Set(prizes.map(p => p.category));
    return Array.from(categories).sort();
};

/**
 * Get min and max years
 * @param {Array} prizes 
 * @returns {Object} { min: number, max: number }
 */
export const getYearRange = (prizes) => {
    if (!prizes.length) return { min: 1901, max: new Date().getFullYear() };
    const years = prizes.map(p => parseInt(p.year)).sort((a, b) => a - b);
    return { min: years[0], max: years[years.length - 1] };
};

/**
 * Filter prizes by category and year range
 */
export const filterPrizes = (prizes, category, minYear, maxYear) => {
    return prizes.filter(prize => {
        // 1. Check Category
        if (category !== 'All' && prize.category !== category) return false;

        // 2. Check Year
        const year = parseInt(prize.year);
        if (year < minYear || year > maxYear) return false;

        // 3. Ensure it has laureates (some war years don't)
        if (!prize.laureates || prize.laureates.length === 0) return false;

        return true;
    });
};
