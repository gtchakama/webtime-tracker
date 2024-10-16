let activeTabId = null;
let startTime = null;
let idleThreshold = 5 * 60; // 5 minutes in seconds
let currentDomain = null;

chrome.storage.sync.get(['idleThreshold'], (result) => {
  if (result.idleThreshold) {
    idleThreshold = result.idleThreshold;
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    handleTabChange(tab);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.status === 'complete') {
    handleTabChange(tab);
  }
});

chrome.idle.setDetectionInterval(idleThreshold);

chrome.idle.onStateChanged.addListener((state) => {
  if (state === 'active') {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      if (tabs.length > 0) {
        handleTabChange(tabs[0]);
      }
    });
  } else {
    updateTimeSpent();
    startTime = null;
    currentDomain = null;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'dataCleared') {
    resetTracking();
  }
});

function handleTabChange(tab) {
  updateTimeSpent();
  activeTabId = tab.id;
  try {
    const url = new URL(tab.url);
    currentDomain = url.hostname;
  } catch (error) {
    console.log('Invalid URL:', tab.url);
    currentDomain = 'unknown';
  }
  startTime = Date.now();
}

function updateTimeSpent() {
  if (startTime && currentDomain) {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // Time spent in seconds
    
    chrome.storage.local.get(['timeSpent'], (result) => {
      let data = result.timeSpent || {};
      let date = new Date().toISOString().split('T')[0];
      
      if (!data[date]) {
        data[date] = {};
      }
      
      if (!data[date][currentDomain]) {
        data[date][currentDomain] = 0;
      }
      
      data[date][currentDomain] += timeSpent;
      
      chrome.storage.local.set({ timeSpent: data }, () => {
        console.log(`Updated time for ${currentDomain}: ${timeSpent} seconds`);
      });
    });
  }
}

function resetTracking() {
  startTime = Date.now();
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    if (tabs.length > 0) {
      handleTabChange(tabs[0]);
    }
  });
}

// Update time spent every minute
setInterval(updateTimeSpent, 60000);