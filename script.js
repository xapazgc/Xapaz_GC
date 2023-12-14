function getCPUSpeed() {
  const cpuSpeed = navigator.hardwareConcurrency;
  return cpuSpeed ? `${cpuSpeed} cores` : 'N/A';
}

// Function to get processor information
function getProcessor() {
  const processorInfo = navigator.platform;
  return processorInfo ? processorInfo : 'N/A';
}

// Function to get device RAM
function getRAM() {
  const ram = navigator.deviceMemory;
  return ram ? `${ram} GB` : 'N/A';
}

// Function to get storage information
async function getStorage() {
  try {
    const storageInfo = await navigator.storage.estimate();
    const storageText = `${formatBytes(storageInfo.usage)} used of ${formatBytes(storageInfo.quota)}`;
    return storageText;
  } catch (error) {
    console.error('Error getting storage information:', error);
    return 'N/A';
  }
}

// Helper function to format bytes into a human-readable format in gigabytes
function formatBytes(bytes) {
  const gigabytes = bytes / (1024 * 1024 * 1024);
  return `${gigabytes.toFixed(2)} GB`;
}

// Function to get display size
function getDisplaySize() {
  const width = screen.width;
  const height = screen.height;
  return `${width} x ${height} pixels`;
}

// Function to get system architecture
function getArchitecture() {
  const architecture = navigator.userAgent.includes('Win64') ? '64-bit' : '32-bit';
  return architecture;
}

// Function to create charts
function createCharts() {
  // Chart for CPU Speed
  const cpuSpeedChartCtx = document.getElementById('cpuSpeedChart').getContext('2d');
  new Chart(cpuSpeedChartCtx, {
    type: 'pie',
    data: {
      labels: ['CPU Speed'],
      datasets: [{
        label: 'Cores',
        data: [parseInt(getCPUSpeed())],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      cutout: '70%',
    }
  });

  // Chart for RAM
  const ramChartCtx = document.getElementById('ramChart').getContext('2d');
  new Chart(ramChartCtx, {
    type: 'pie',
    data: {
      labels: ['RAM'],
      datasets: [{
        label: 'GB',
        data: [parseFloat(getRAM())],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      cutout: '70%',
    }
  });

  // Chart for Storage
  getStorage().then(storageInfo => {
    const storageChartCtx = document.getElementById('storageChart').getContext('2d');
    new Chart(storageChartCtx, {
      type: 'pie',
      data: {
        labels: ['Used', 'Free'],
        datasets: [{
          label: 'GB',
          data: [parseFloat(storageInfo.split(' ')[0]), parseFloat(storageInfo.split(' ')[2])],
          backgroundColor: ['rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
          borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        cutout: '70%',
      }
    });
  });

  // Chart for Display Size
  const displaySizeChartCtx = document.getElementById('displaySizeChart').getContext('2d');
  const displaySize = getDisplaySize().split('x');
  new Chart(displaySizeChartCtx, {
    type: 'pie',
    data: {
      labels: ['Width', 'Height'],
      datasets: [{
        data: [parseInt(displaySize[0]), parseInt(displaySize[1])],
        backgroundColor: ['rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      cutout: '70%',
    }
  });

  // Chart for Architecture
  const architectureChartCtx = document.getElementById('architectureChart').getContext('2d');
  new Chart(architectureChartCtx, {
    type: 'pie',
    data: {
      labels: ['32-bit', '64-bit'],
      datasets: [{
        data: [getArchitecture() === '32-bit' ? 1 : 0, getArchitecture() === '64-bit' ? 1 : 0],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      cutout: '70%',
    }
  });
}

// Update the HTML elements and create charts
document.getElementById('cpuSpeed').textContent = `CPU Cores: ${getCPUSpeed()}`;
document.getElementById('processor').textContent = `Processor: ${getProcessor()}`;
document.getElementById('ram').textContent = `RAM: ${getRAM()}`;
getStorage().then(storageInfo => {
  document.getElementById('storage').textContent = `Storage: ${storageInfo}`;
});
document.getElementById('displaySize').textContent = `Display Size: ${getDisplaySize()}`;
document.getElementById('architecture').textContent = `Architecture: ${getArchitecture()}`;

// Create charts
createCharts();
 function removePlaceholder(element) {
            element.placeholder = '';
        }