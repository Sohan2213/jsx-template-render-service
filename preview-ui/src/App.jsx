import { useState } from 'react';
import React from 'react';
function App() {
  const [template, setTemplate] = useState("onboarding");
  const [jsonData, setJsonData] = useState(`{ "name": "John", "amount": "1000 PGK" }`);
  const [htmlPreview, setHtmlPreview] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const renderPreview = async () => {
    const res = await fetch("/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template,
        data: JSON.parse(jsonData),
        outputType: "html"
      })
    });

    const html = await res.text(); // because it's HTML
    setHtmlPreview(html);
    setPdfUrl(""); // clear PDF preview
  };

  const renderPdf = async () => {
    const res = await fetch("/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template,
        data: JSON.parse(jsonData),
        outputType: "pdf"
      })
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setHtmlPreview(""); // clear HTML preview
  };

  return (
    <div>
      <h2>Live Renderer</h2>
      <input value={template} onChange={e => setTemplate(e.target.value)} />
      <br />
      <textarea
        value={jsonData}
        onChange={e => setJsonData(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={renderPreview}>Preview HTML</button>
      <button onClick={renderPdf}>Render PDF</button>

      <div style={{ marginTop: '20px', border: '1px solid #ccc' }}>
        {htmlPreview && (
          <iframe
            srcDoc={htmlPreview}
            style={{ width: "100%", height: "600px" }}
            title="HTML Preview"
          />
        )}
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            style={{ width: "100%", height: "600px" }}
            title="PDF Preview"
          />
        )}
      </div>
    </div>
  );
}

export default App;
