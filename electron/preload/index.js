import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipc', {
  closeApp: () => ipcRenderer.send('close-app'),
  minApp: () => ipcRenderer.send('min-app'),
  scaleApp: () => ipcRenderer.send('scale-app'),
  resetWindow: () => ipcRenderer.send('reset-window')
})
