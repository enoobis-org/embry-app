const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    resizable: false, // Set resizable to false
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, 'icon', 'image.png')
  });

  mainWindow.loadURL('https://enoobis-org.github.io/embry/');

  // Inject CSS to hide scroll bar
  mainWindow.webContents.insertCSS(`
    ::-webkit-scrollbar {
      display: none;
    }
  `);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Remove default menu
  Menu.setApplicationMenu(null);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
