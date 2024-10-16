document.addEventListener('DOMContentLoaded', function() {
  updateStats();
  document.getElementById('view-details').addEventListener('click', viewDetails);
  document.getElementById('clear-data').addEventListener('click', clearData);
});

function updateStats() {
  const today = new Date().toISOString().split('T')[0];
  
  chrome.storage.local.get(['timeSpent'], function(result) {
    const data = result.timeSpent && result.timeSpent[today] ? result.timeSpent[today] : {};
    
    // Calculate total time
    const totalSeconds = Object.values(data).reduce((a, b) => a + b, 0);
    const totalTime = formatTime(totalSeconds);
    document.getElementById('total-time').textContent = totalTime;
    
    // Display top sites
    const sortedSites = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topSitesList = document.getElementById('top-sites');
    topSitesList.innerHTML = '';
    sortedSites.forEach(([site, time]) => {
      const li = document.createElement('li');
      li.textContent = `${site}: ${formatTime(time)}`;
      topSitesList.appendChild(li);
    });
  });
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

function viewDetails() {
  chrome.tabs.create({url: 'stats.html'});
}

function clearData() {
  if (confirm('Are you sure you want to clear all stored data? This action cannot be undone.')) {
    chrome.storage.local.set({ timeSpent: {} }, function() {
      console.log('Data cleared');
      updateStats();
      chrome.runtime.sendMessage({ action: 'dataCleared' });
    });
  }
}