// background.js

// // Listen for a message from content.js
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === 'executeScript') {
//         chrome.scripting.executeScript({
//             target: { tabId: sender.tab.id },
//             files: ['content.js']
//         });
//     }
// });

// // Listen for when a Tab changes state
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'complete' && /^https:\/\/twitter\.com/.test(tab.url)) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             files: ['content.js']
//         });
//     }
// });