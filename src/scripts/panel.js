//Fire 4th : handling event on panel
document.onreadystatechange = function () {
  document
    .getElementById("noproxy-id")
    .addEventListener("click", setNoProxySetting);

  document
    .getElementById("systemproxy-id")
    .addEventListener("click", setSystemProxySetting);

  document
    .getElementById("manualproxy-id")
    .addEventListener("click", setManualProxySetting);

  document
    .getElementById("manualproxy-config-button-id")
    .addEventListener("click", manualProxyFormHandler);
};

//Fire 2th : gotProxyType get proxy type then pass type to currentProxyType function
function gotProxyType(popupURL) {
  browser.proxy.settings.get({}).then(function (proxyInfo) {
    setupSwitcher(proxyInfo.value.proxyType);
  });
}

//Fire 1th : gettingPopup call gotProxyType function and pass popupURL
var gettingPopup = browser.browserAction.getPopup({});
gettingPopup.then(gotProxyType);
