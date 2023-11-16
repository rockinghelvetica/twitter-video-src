// Content script to install the real work
var script = document.createElement('script');
script.src = chrome.runtime.getURL('twitter-video-src.js');
(document.head||document.documentElement).appendChild(script);