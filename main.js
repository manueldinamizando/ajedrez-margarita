const { app, BrowserWindow } = require('electron');
const path = require('path');

function crearVentana() {
    const ventana = new BrowserWindow({
        width: 1300,
        height: 900,
        webPreferences: {
            nodeIntegration: true,        // Permite usar require('fs') en el HTML para leer el config.json
            contextIsolation: false,      // Permite que el HTML comparta el entorno de Node local
            sandbox: false                // CRUCIAL: Permite que tus Web Workers (Stockfish) funcionen desde Blobs locales
        }
    });

    // Carga tu HTML definitivo
    ventana.loadFile('margarita arreglo enroque 1606.html'); 

    // Abre las herramientas de desarrollador por si hay algún error en el primer arranque
    ventana.webContents.openDevTools();
}

app.whenReady().then(() => {
    crearVentana();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) crearVentana();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});