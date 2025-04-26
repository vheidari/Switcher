// background_script.js :
// background script load when browser load to memory

// set switcher badgetText with proxy type
function startupProxyType(proxyType) {
  switch (proxyType) {
    case "none":
      setBadgeText("N");
      break;

    case "system":
      setBadgeText("S");
      break;

    case "manual":
      setBadgeText("M");
      break;
  }
}

// get proxy setting then call startupProxyType
browser.proxy.settings.get({}).then(function (proxyInfo) {
  // set proxy type
  startupProxyType(proxyInfo.value.proxyType);
});
