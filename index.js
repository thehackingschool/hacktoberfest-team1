const { app, BrowserWindow, TouchBar, ipcMain, net } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar


const createWindow = () => {
    window = new BrowserWindow({
        width: 1000, 
        height: 800, 
        minWidth: 600,
        minHeight: 500,
        x: 10, 
        y: 10, 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true //this value should be false for production application
        }
    })
    window.loadFile("index.html")
    window.webContents.openDevTools()
}


app.whenReady().then(() => {
    createWindow()
})

