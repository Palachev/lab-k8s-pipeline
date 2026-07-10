const http = require('http');
const os = require('os');

const port = process.env.PORT || 3000;
const podName = process.env.POD_NAME || process.env.HOSTNAME || os.hostname();
const containerId = os.hostname();

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Pod Viewer</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #0f172a, #1e3a8a);
        color: #f8fafc;
        min-height: 100vh;
        display: grid;
        place-items: center;
        margin: 0;
      }
      .card {
        background: rgba(15, 23, 42, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        padding: 32px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        text-align: center;
        max-width: 540px;
      }
      h1 { margin-bottom: 12px; }
      .badge {
        display: inline-block;
        margin-top: 12px;
        padding: 10px 16px;
        border-radius: 999px;
        background: #38bdf8;
        color: #082f49;
        font-weight: bold;
      }
      .meta { margin-top: 16px; color: #cbd5e1; }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>Привет из Kubernetes!</h1>
      <p>Это простое приложение показывает, какой именно pod его обслуживает.</p>
      <div class="badge">Pod: ${podName}</div>
      <div class="meta">Hostname: ${containerId}</div>
    </main>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok', pod: podName }));
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
});

server.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
  console.log(`Pod name: ${podName}`);
});
