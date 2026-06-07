import React from 'react';

const FILTERS = [
  { id: 'original', name: 'Original', icon: '📷' },
  { id: 'clarendon', name: 'Clarendon', icon: '✨' },
  { id: 'juno', name: 'Juno', icon: '💙' },
  { id: 'lark', name: 'Lark', icon: '🌙' },
  { id: 'ludwig', name: 'Ludwig', icon: '🌅' },
  { id: 'perpetua', name: 'Perpetua', icon: '🌊' },
  { id: 'reyes', name: 'Reyes', icon: '☀️' },
  { id: 'slumber', name: 'Slumber', icon: '😴' },
];

function FilterPanel({ selectedFilter, onFilterChange }) {
  return (
    <div className="filter-panel">
      <h3>Choose Your Filter</h3>
      <div className="filter-grid">
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            title={filter.name}
          >
            <span className="filter-icon">{filter.icon}</span>
            <span className="filter-name">{filter.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;