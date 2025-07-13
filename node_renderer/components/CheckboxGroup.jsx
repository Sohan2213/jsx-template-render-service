import React from 'react';

const CheckboxGroup = ({ label, options, selected = [] }) => (
  <div className="checkbox-group">
    <div className="checkbox-label">{label}</div>
    <div className="checkbox-options">
      {options.map(opt => (
        <label key={opt} className="checkbox-item">
          <input type="checkbox" checked={selected.includes(opt)} readOnly />
          {opt}
        </label>
      ))}
    </div>
  </div>
);

export default CheckboxGroup;
