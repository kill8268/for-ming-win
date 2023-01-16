const { screen, ipcMain } = require('electron');

module.exports = (win, id) => {
  let moving_interval = null;

  ipcMain.on('window-move-evt', (sender, data) => {
    if (data['id'] === id && data['move']) {
      const win_size = win.getSize();
      const win_pos = win.getPosition();
      const mos_pos = screen.getCursorScreenPoint();
      if (moving_interval) {
        clearInterval(moving_interval);
      }
      moving_interval = setInterval(() => {
        const current_pos = screen.getCursorScreenPoint();
        const x = win_pos[0] + current_pos.x - mos_pos.x;
        const y = win_pos[1] + current_pos.y - mos_pos.y;
        win.setBounds({ x: x, y: y, width: win_size[0], height: win_size[1] });
      }, 15);
    } else {
      clearInterval(moving_interval);
    }
  });
}