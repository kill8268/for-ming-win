const { BrowserWindow } = require('electron');
const windowMove = require('./windowMove');

// Create the browser window. 创建默认窗口
module.exports = () => {
  const ball = new BrowserWindow({
    id: 1,
    width: 104, // 窗口宽
    height: 104, // 网口高
    maxWidth: 104, // 最大宽
    maxHeight: 104, // 最大高
    resizable: false, // 是否可改变大小
    skipTaskbar: true, // 是否在任务栏显示
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true, // 是否集成node
      contextIsolation: false, // 是否隔离
    },
    frame: false, // 无边框
    transparent: true, // 透明
  });

  windowMove(ball, 1);

  // ball.setEnabled(false);
  
  ball.on('close', () => ball.hide())

  ball.setPosition(1200, 700);

  ball.setAlwaysOnTop(true, 'floating', 1);

  // and load the index.html of the app.
  ball.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  return ball;
}