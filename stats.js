function debugLog(message) {
  const debugOutput = document.getElementById('debug-output');
  debugOutput.textContent += message + '\n';
  console.log(message);
}

document.addEventListener('DOMContentLoaded', function() {
  debugLog('DOM Content Loaded');
  
  if (chrome && chrome.storage && chrome.storage.local) {
    debugLog('Chrome storage API is available');
    chrome.storage.local.get(['timeSpent'], function(result) {
      debugLog('Retrieved data from storage: ' + JSON.stringify(result));
      if (result.timeSpent) {
        updateStats(result.timeSpent);
      } else {
        debugLog('No time spent data found in storage');
      }
    });
  } else {
    debugLog('Chrome storage API is not available');
  }
});

function updateStats(data) {
  debugLog('Updating stats with data: ' + JSON.stringify(data));
  
  const today = new Date().toISOString().split('T')[0];
  const todayData = data[today] || {};

  debugLog('Today\'s data: ' + JSON.stringify(todayData));

  const statsBody = document.getElementById('stats-body');
  statsBody.innerHTML = '';

  let totalTime = 0;

  Object.entries(todayData)
    .sort((a, b) => b[1] - a[1])
    .forEach(([domain, seconds]) => {
      const row = statsBody.insertRow();
      const domainCell = row.insertCell(0);
      const timeCell = row.insertCell(1);

      domainCell.textContent = domain;
      timeCell.textContent = formatTime(seconds);

      totalTime += seconds;
    });

  const totalTimeElement = document.getElementById('total-time');
  totalTimeElement.textContent = `Total time: ${formatTime(totalTime)}`;

  debugLog('Stats table updated successfully');
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}