import Field from '../components/Field.jsx';
import React from 'react';
export default ({ data, themeCss }) => (
  <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body className="font-sans p-10 bg-white">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Onboarding Notice</h1>
      <Field label="Name" value={data.name} />
      <Field label="Amount" value={data.amount} />
    </body>
  </html>
);
