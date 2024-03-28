const { ipcRenderer } = require('electron');

const analyzeButton = document.getElementById('analyzeButton');

analyzeButton.addEventListener('click', () => {
    // Trigger the analysis process
    window.api.analyze();
});

// Listen for the completion of analysis process
ipcRenderer.on('displayGraph', (_, svgContent) => {
    // Open a new window and display the graph
    const graphWindow = window.open('', '_blank');
    graphWindow.document.write(svgContent);
});
