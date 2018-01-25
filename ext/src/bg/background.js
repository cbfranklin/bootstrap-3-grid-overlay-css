chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {code:"document.body.classList.toggle('bootstrap-3-grid-overlay')"});
});
