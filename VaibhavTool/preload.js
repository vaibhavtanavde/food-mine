const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    analyze: () => {
        ipcRenderer.send('analyze');
    }
});
