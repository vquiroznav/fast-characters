const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const axios = require('axios'); // Para llamar a la API de IA

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });

    mainWindow.loadFile('index.html');
});

// Función para generar el trasfondo con IA
ipcMain.handle('generate-background', async (event, data) => {
    const prompt = `Crea un trasfondo detallado para un personaje llamado ${data.name}, de ${data.age} años, con la siguiente descripción: ${data.description}`;
    const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 150,
        },
        {
            headers: {
                'Authorization': `Bearer TU_API_KEY`, // Reemplaza con tu API key de OpenAI
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data.choices[0].text.trim();
});

// Función para guardar el personaje
ipcMain.handle('save-character', (event, character) => {
    const filePath = path.join(__dirname, 'characters.json');
    let characters = [];

    if (fs.existsSync(filePath)) {
        characters = JSON.parse(fs.readFileSync(filePath));
    }

    characters.push(character);
    fs.writeFileSync(filePath, JSON.stringify(characters, null, 2));
});
