const { app, BrowserWindow, protocol, shell } = require('electron');
const path = require('path');

// Use a proper, persistent origin (app://) instead of file://
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'app',
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true
    }
  }
]);

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 980,
    minHeight: 640,
    backgroundColor: '#0e0e12',
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
      nodeIntegration: false
    }
  });

  // Prevent the app from opening arbitrary new windows
  win.webContents.setWindowOpenHandler(({ url }) => {
    // If the app ever links out, open it in the default browser.
    shell.openExternal(url).catch(() => {});
    return { action: 'deny' };
  });

  // Prevent navigation away from app://
  win.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('app://')) {
      event.preventDefault();
      shell.openExternal(url).catch(() => {});
    }
  });

  win.loadURL('app://index.html');
}

app.whenReady().then(() => {
  protocol.registerFileProtocol('app', (request, callback) => {
    try {
      const url = request.url.replace(/^app:\/\//, '');
      const filePath = path.join(__dirname, decodeURIComponent(url));
      callback({ path: filePath });
    } catch (e) {
      callback({ error: -2 }); // FILE_NOT_FOUND
    }
  });

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
