const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");

if (!app.requestSingleInstanceLock()) app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 820, minHeight: 600,
    title: "Dorixona Hisoboti", autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
  win.loadFile(path.join(__dirname, "www", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify().catch(() => {});
});
app.on("window-all-closed", () => app.quit());
