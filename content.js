// content.js
var script = document.createElement('script');
script.src = chrome.runtime.getURL('twitter-video-src.js');
(document.head||document.documentElement).appendChild(script);
// script.onload = function() {
//     this.remove();
// };

// Send a message to background.js to execute the script
//chrome.runtime.sendMessage({action: 'executeScript'});

// Your inline scripting code goes here
// For example, you can manipulate the DOM of Twitter.com
// This is just a placeholder and won't actually do anything
// document.body.addEventListener('click', function() {
//     console.log('Clicked on the body of Twitter.com');
// });