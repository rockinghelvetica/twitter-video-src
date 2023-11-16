// Saves options to chrome.storage
function save_options() {
  var enable = document.getElementById('enable').checked;
  chrome.storage.sync.set({
    enableExtension: enable
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    enableExtension: true
  }, function(items) {
    document.getElementById('enable').checked = items.enableExtension;
  });
}

// Listen for the DOM to be ready, then restore options and add a listener to the save button
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
