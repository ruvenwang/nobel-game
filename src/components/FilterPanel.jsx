import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({
    categories,
    minYear,
    maxYear,
    selectedCategory,
    onCategoryChange,
    selectedYearRange,
    onYearRangeChange
}) => {

    const handleMinYearChange = (e) => {
        const val = parseInt(e.target.value) || minYear;
        onYearRangeChange({ ...selectedYearRange, min: val });
    };

    const handleMaxYearChange = (e) => {
        const val = parseInt(e.target.value) || maxYear;
        onYearRangeChange({ ...selectedYearRange, max: val });
    };

    return (
        <div className="filter-panel">
            <h2>Game Settings</h2>

            <div className="filter-group">
                <label htmlFor="category-select">Category</label>
                <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Year Range ({minYear} - {maxYear})</label>
                <div className="range-inputs">
                    <div className="input-wrapper">
                        <span>From</span>
                        <input
                            type="number"
                            min={minYear}
                            max={selectedYearRange.max}
                            value={selectedYearRange.min}
                            onChange={handleMinYearChange}
                        />
                    </div>
                    <div className="input-wrapper">
                        <span>To</span>
                        <input
                            type="number"
                            min={selectedYearRange.min}
                            max={maxYear}
                            value={selectedYearRange.max}
                            onChange={handleMaxYearChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
