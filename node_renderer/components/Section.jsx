import React from 'react';
const Section = ({ title, children }) => (
  <div className="section">
    <h3 className="section-title">{title}</h3>
    <div className="section-body">{children}</div>
  </div>
);

export default Section;
