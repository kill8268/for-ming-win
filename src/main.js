const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const Ball = require('./client/ball');
const Tray = require('./client/tray');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// 初始窗口
const createWindow = () => {
  ipcMain.on('open-url', (event, url) => {
    shell.openExternal(url);
  });
  Menu.setApplicationMenu(null)
 
  const ball = Ball()
  // 是否默认打开控制台
  // ball.webContents.openDevTools();
  Tray(ball)

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
