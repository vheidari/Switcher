// Switcher swith command : ALT + CTRL + S
// Switch command :
// - switch  command define in manifetst.json
// - it toggle proxy setting between system proxy and manual proxy
browser.commands.onCommand.addListener(function (command) {
  if (command === "switch") {
    let isSwitcherLocalStorageExist;
    browser.proxy.settings.get({}).then(function (proxyInfo) {
      switch (proxyInfo.value.proxyType) {
        case "none":
          setBadgeText("S");

          isSwitcherLocalStorageExist = localStorage.getItem(
            "SwitcherManualProxyConfig",
          );

          let systemProxySetting;
          if (!isSwitcherLocalStorageExist) {
            systemProxySetting = {
              proxyType: "system",
            };
          } else {
            // Raw Format to Object
            isSwitcherLocalStorageExist = JSON.parse(
              isSwitcherLocalStorageExist,
            );
            systemProxySetting = {
              proxyType: "system",
              passthrough: isSwitcherLocalStorageExist.passthrough,
            };
          }

          browser.proxy.settings.set({ value: systemProxySetting });
          break;

        case "system":
          setBadgeText("M");

          // Checking LocalStorage Config is exist or not
          isSwitcherLocalStorageExist = localStorage.getItem(
            "SwitcherManualProxyConfig",
          );

          let manualProxySetting;
          if (!isSwitcherLocalStorageExist) {
            manualProxySetting = {
              proxyType: "manual",
              http: "", // for http
              ssl: "", //for https
              socks: "", // for socks
              socksVersion: 4, // for socks version
              passthrough: "", // for no proxy for
            };

            // directly update http field in the firefox settings
            browser.proxy.settings.set({ value: manualProxySetting });

            localStorage.setItem(
              "SwitcherManualProxyConfig",
              JSON.stringify(manualProxySetting),
            );
          } else {
            manualProxySetting = JSON.parse(isSwitcherLocalStorageExist);
            manualProxySetting.proxyType = "manual";
            localStorage.setItem(
              "SwitcherManualProxyConfig",
              JSON.stringify(manualProxySetting),
            );
            browser.proxy.settings.set({ value: manualProxySetting });
          }

          break;

        case "manual":
          setBadgeText("N");
          let noProxySetting = {
            proxyType: "none",
          };

          browser.proxy.settings.set({ value: noProxySetting });
          break;

        default:
          break;
      }
    });
  }
});

//Suggest Switcher ADD-ONS home page in omnibox
browser.omnibox.onInputStarted.addListener(function () {
  browser.omnibox.setDefaultSuggestion({
    description: "Go to Switcher ADD-ONS page",
  });
});

//Go to Switcher ADD-ONS home page on firefox ADD-ONS
browser.omnibox.onInputEntered.addListener(function () {
  browser.tabs.update({
    url: "http://addons.mozilla.org/en-US/firefox/addon/switcher_proxy/",
  });
});
