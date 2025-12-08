const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const PUBLIC_DIR = path.join(__dirname);

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Configurar CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'demo.html' : req.url);

    // Seguridad: prevenir acceso fuera del directorio
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>404 - No encontrado</title>
                        <style>
                            body { font-family: Arial; text-align: center; padding: 50px; background: #f0f0f0; }
                            h1 { color: #e74c3c; }
                            a { color: #3498db; text-decoration: none; }
                        </style>
                    </head>
                    <body>
                        <h1>404 - Archivo no encontrado</h1>
                        <p>La ruta ${req.url} no existe</p>
                        <a href="/">Volver al inicio</a>
                    </body>
                    </html>
                `);
            } else {
                res.writeHead(500);
                res.end(`Error del servidor: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log('🚀 SERVIDOR LOCAL DE TÓTEMS INICIADO');
    console.log('='.repeat(60));
    console.log('');
    console.log(`📍 URL Principal: http://localhost:${PORT}`);
    console.log(`📍 Demo: http://localhost:${PORT}/demo.html`);
    console.log(`📍 Tótem directo: http://localhost:${PORT}/index.html?totem=1`);
    console.log('');
    console.log('💡 Presiona Ctrl+C para detener el servidor');
    console.log('='.repeat(60));
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ ERROR: El puerto ${PORT} ya está en uso.`);
        console.error(`   Cierra otras aplicaciones o cambia el puerto en el script.`);
    } else {
        console.error('❌ ERROR:', err.message);
    }
    process.exit(1);
});
