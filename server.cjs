const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/src/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'style.css'));
});

app.get('/src/main.ts', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'main.ts'));
});

app.get('/src/bascet.ts', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'bascet.ts'));
});

app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, 'image', imageName));
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту http://localhost:${PORT}`);
});
