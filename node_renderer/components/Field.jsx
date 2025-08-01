import React from 'react';
const Field = ({ label, value }) => (
  <div className="mb-4 flex items-center">
    <div className="font-semibold w-40 inline-block text-gray-700">{label}</div>
    <div className="ml-2 text-gray-900">{value || '—'}</div>
  </div>
);

export default Field;



