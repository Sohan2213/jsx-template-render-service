import React from 'react';
const Field = ({ label, value }) => (
  <div className="field">
    <div className="field-label">{label}</div>
    <div className="field-value">{value || '—'}</div>
  </div>
);

export default Field;



