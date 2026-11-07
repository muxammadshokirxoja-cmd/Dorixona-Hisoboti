const { app, BrowserWindow, Menu, shell } = require("electron");
const path = require("path");

const SITE = "https://muxammadshokirxoja-cmd.github.io/Dorixona-Hisoboti/index.html";
if (!app.requestSingleInstanceLock()) app.quit();

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 820, minHeight: 600,
    title: "Dorixona Hisoboti", autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  Menu.setApplicationMenu(null);
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
  let fellBack = false;
  win.webContents.on("did-fail-load", (e, code, desc, url, isMain) => {
    if (!isMain || fellBack) return;
    fellBack = true;
    win.loadFile(path.join(__dirname, "www", "index.html"));
  });
  win.webContents.on("before-input-event", (e, i) => {
    if (i.type === "keyDown" && (i.key === "F5" || (i.control && i.key.toLowerCase() === "r"))) {
      e.preventDefault(); fellBack = false; win.loadURL(SITE);
    }
  });
  win.loadURL(SITE);
}

app.whenReady().then(createWindow);
app.on("second-instance", () => { const w = BrowserWindow.getAllWindows()[0]; if (w) { if (w.isMinimized()) w.restore(); w.focus(); } });
app.on("window-all-closed", () => app.quit());
