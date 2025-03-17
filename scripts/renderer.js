const { ipcRenderer } = require('electron');

document.getElementById('generateBackground').addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;

    if (!name || !age || !description) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Enviar datos al backend para generar el trasfondo
    const background = await ipcRenderer.invoke('generate-background', { name, age, description });
    document.getElementById('generatedBackground').textContent = background;
});

document.getElementById('characterForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const description = document.getElementById('description').value;
    const background = document.getElementById('generatedBackground').textContent;

    if (!name || !age || !description || !background) {
        alert('Por favor, completa todos los campos y genera un trasfondo.');
        return;
    }

    // Guardar el personaje
    await ipcRenderer.invoke('save-character', { name, age, description, background });
    alert('Personaje guardado correctamente.');
});