const { app, BrowserWindow, Menu, shell, Tray } = require('electron');


// 创建系统托盘
module.exports = (ball) => {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开默认浏览器',
      click: () => {
        shell.openExternal('https://www.bing.com')
      }
    },
    {
      label: '打开electron创建的浏览器',
      click: () => {
        let bing = new BrowserWindow({
          width: 800, // 窗口宽
          height: 600, // 网口高
          webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
          },
          title: 'electron创建的浏览器',
        })
        bing.loadURL('https://www.bing.com')
        bing.on('close', () => bing = null)
        bing.show()
      }
    },
    {
      label: '隐藏',
      click: () => ball.hide()
    },
    {
      label: '退出',
      click: () => app.quit()
    }
  ])
  const tray = new Tray('logo.png') // 图标
  tray.setToolTip('Hi~ o(*￣▽￣*)ブ') // 鼠标悬停提示
  tray.on('click', () => {
    ball.show()
  })
  tray.setContextMenu(contextMenu)
  return tray
}
