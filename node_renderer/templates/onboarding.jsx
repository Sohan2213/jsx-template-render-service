import Field from '../components/Field.jsx';
import React from 'react';
export default ({ data }) => (
  <html>
    <head>
      <style>{`
        body { font-family: Arial; padding: 40px; }
        .label { font-weight: bold; width: 150px; display: inline-block; }
        .field { margin-bottom: 10px; }
      `}</style>
    </head>
    <body>
      <h1 style={{color: 'red', textAlign: 'center'}}>Onboarding Notice</h1>
      <Field label="Name" value={data.name} />
      <Field label="Amount" value={data.amount} />
    </body>
  </html>
);
