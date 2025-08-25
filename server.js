import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const port = process.env.PORT || 5002;

const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = createServer((req, res) => {
  let filePath = join(__dirname, 'dist', req.url === '/' ? 'index.html' : req.url);
  
  // Добавляем .html если файл не найден (для SPA)
  if (!existsSync(filePath) && !extname(filePath)) {
    filePath += '.html';
  }
  
  if (!existsSync(filePath)) {
    // Если файл не существует, вернем index.html
    filePath = join(__dirname, 'dist', 'index.html');
  }

  try {
    const content = readFileSync(filePath);
    const ext = extname(filePath);
    const contentType = contentTypes[ext] || 'text/plain';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (error) {
    console.error('Error serving file:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Server error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`✅ Build successful!`);
});