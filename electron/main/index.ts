import { BrowserWindow, app, ipcMain } from "electron"
import { release } from 'os'
import { join } from 'path'

process.env.DIST = join(__dirname, '../..')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public')

// disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// Judgement application have got thread lock for single instance
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.ts')
const url = process.env.DEV_SERVER_URL as string
const indexHtml = join(process.env.DIST, 'index.html')

const createWindow = async () => {
  win = new BrowserWindow({
    title: 'Evetion',
    width: 1336,
    height: 768,
    resizable: false,
    show: false,
    frame: false,
    backgroundColor: '#0F0F0F',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
  }
  // win.once('ready-to-show', () => win?.show())
  // win.webContents.openDevTools()

  ipcMain.on('close-app', () => win?.close())

  ipcMain.on('min-app', () => win?.minimize())
}

app.whenReady().then(createWindow)

app.on('activate', () => {
  const wins = BrowserWindow.getAllWindows()
  if (wins.length) wins[0].focus()
  else createWindow()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})
