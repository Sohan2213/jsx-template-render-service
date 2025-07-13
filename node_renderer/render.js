require('@babel/register')({
  extensions: ['.js', '.jsx'],
  ignore: [/node_modules/]
});

const express = require('express');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const puppeteer = require('puppeteer');
const fs = require('fs');
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const themeCss = fs.readFileSync(path.join(__dirname, 'theme.css'), 'utf8');

const app = express();
app.use(express.json());

app.post('/render', async (req, res) => {
  const { template, data = {}, outputType = 'pdf' } = req.body;

  if (!template || typeof template !== 'string') {
    return res.status(400).json({ error: "Template name is required" });
  }

  const templatePath = path.resolve(__dirname, 'templates', `${template}.jsx`);
  const schemaPath = path.resolve(__dirname, 'templates', `${template}.schema.json`);

  if (!fs.existsSync(templatePath)) {
    return res.status(404).json({ error: `Template '${template}.jsx' not found` });
  }

  if (!fs.existsSync(schemaPath)) {
    return res.status(500).json({ error: `Schema '${template}.schema.json' is missing` });
  }

  // Validate payload against schema
  try {
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
      return res.status(400).json({
        error: "Payload validation failed",
        details: validate.errors.map(e => {
          const field = e.instancePath.replace(/^\//, '') || '(root)';
          return `${field} ${e.message}`;
        })
      });
    }
  } catch (err) {
    return res.status(500).json({ error: `Schema validation error: ${err.message}` });
  }

  // Load JSX template
  let Component;
  try {
    const tplModule = require(templatePath);
    Component = tplModule.default;
    console.log(Component)
    if (!Component) throw new Error("Missing default export in template");
  } catch (err) {
    return res.status(500).json({ error: `Template load failed: ${err.message}` });
  }

  // Render JSX to HTML
  let html;
  try {
    const element = React.createElement(Component, { data, themeCss });
    html = ReactDOMServer.renderToStaticMarkup(element);
  } catch (err) {
    return res.status(500).json({ error: `JSX render failed: ${err.message}` });
  }

  // Launch Puppeteer and render
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 10000 });

    let buffer;
    if (outputType === 'image') {
      buffer = await page.screenshot({ fullPage: true });
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', 'inline; filename="rendered.png"');
    } else {
      buffer = await page.pdf({ format: 'A4', printBackground: true });
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="rendered.pdf"');
    }

    // Send buffer and close browser
    await browser.close();
    return res.send(buffer);

  } catch (err) {
    console.error(`❌ Puppeteer rendering error: ${err.message}`);
    if (browser) await browser.close();
    return res.status(500).json({ error: `Rendering failed: ${err.message}` });
  }
});

// Optional: healthcheck
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'render' });
});

app.listen(3000, () => {
  console.log("✅ Renderer service listening on port 3000");
});
