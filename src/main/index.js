'use strict'

import { app, BrowserWindow, ipcMain, dialog } from 'electron'
import { autoUpdater } from 'electron-updater'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 700,
    title: '智铃校园后台管理系统',
    useContentSize: true,
    webPreferences: {
      webSecurity: false
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // mainWindow.webContents.openDevTools({ mode: 'right' })
}

app.on('ready', () => {
  createWindow()
  if (process.env.NODE_ENV === 'production') {
    autoUpdateHandle()
  }
  // autoUpdateHandle()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

function autoUpdateHandle () {
  autoUpdater.autoDownload = false
  autoUpdater.setFeedURL(process.env.DOWNLOAD_URL)

  autoUpdater.on('error', error => {
    sendDataToWindow('update-error', error)
  })
    .on('checking-for-update', () => {
      sendDataToWindow('checking-for-update', null)
    })
    .on('update-available', info => {
      dialog.showMessageBox({
        type: 'question',
        title: '更新提示',
        message: `检测到新版本 v${info.version}, 是否立即更新?`,
        buttons: ['立即更新', '取消'],
        defaultId: 0,
        cancelId: 1
      }, (button) => {
        if (button === 0) {
          autoUpdater.downloadUpdate()
          sendDataToWindow('start-download', info)
        }
      })
      sendDataToWindow('update-available', info)
    })
    .on('update-not-available', info => {
      sendDataToWindow('update-not-available', info)
    })
    .on('download-progress', progressObj => {
      sendDataToWindow('download-progress', progressObj)
    })
    .on('update-downloaded', () => {
      const dialogOpts = {
        type: 'info',
        buttons: ['立即重启', '稍后重启'],
        title: '更新提示',
        message: '新版本已下载完毕，请重启软件进行更新'
      }
      dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) {
          autoUpdater.quitAndInstall()
        } else {
          sendDataToWindow('update-downloaded', null)
        }
      })
    })

  // 等待 renderer 线程发送 checkForUpdate 消息
  ipcMain.on('checkForUpdate', () => {
    autoUpdater.checkForUpdates()
  })
}

function sendDataToWindow (event, data) {
  mainWindow.webContents.send(event, data)
}
