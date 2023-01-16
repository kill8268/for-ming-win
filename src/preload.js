// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// 预加载文件
// 通过preload注入到渲染进程中
window.isClient=true;

window.ipcRenderer = require('electron').ipcRenderer;
