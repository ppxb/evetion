import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipc', {
  closeApp: () => ipcRenderer.send('close-app'),
  minApp: () => ipcRenderer.send('min-app')
})
