function setManualProxyFormEvents() {
  let getAllInput = document.querySelectorAll("input[type='text']");
  let getHttpForHttpsCheckbox = document.getElementById(
    "set-http-url-for-https",
  );
  let getSocksVersionRadio = document.querySelectorAll("input[type='radio']");

  // setup event for form inputs text feild
  Object(getAllInput).forEach(function (item) {
    item.addEventListener("keyup", function (input) {
      handelEventOnKeyUpOnInputItem(input);
    });
    item.addEventListener("paste", function (input) {
      handelEventOnPasteOnInputItem(input);
    });
  });

  // setup event for checkbox
  getHttpForHttpsCheckbox.addEventListener("click", function (item) {
    let isChecked = this.checked;
    let getHttpFieldValue = document.getElementById("http-proxy-url").value;
    let getHttpsField = document.getElementById("https-proxy-url");

    let isSwitcherLocalStorageExist = localStorage.getItem(
      "SwitcherManualProxyConfig",
    );

    if (isChecked) {
      getHttpsField.value = getHttpFieldValue;
      getHttpsField.disabled = true;

      if (isSwitcherLocalStorageExist) {
        let getLocalStorageObject = JSON.parse(
          localStorage.getItem("SwitcherManualProxyConfig"),
        );
        getLocalStorageObject.proxyType = "manual";
        getLocalStorageObject.ssl = getHttpFieldValue;

        // directly update http and https same value field firefox settings
        browser.proxy.settings.set({ value: getLocalStorageObject });

        let updateLocalStorage = JSON.stringify(getLocalStorageObject);
        localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);
      }
    } else {
      getHttpsField.value = "";
      getHttpsField.disabled = false;

      if (isSwitcherLocalStorageExist) {
        let getLocalStorageObject = JSON.parse(
          localStorage.getItem("SwitcherManualProxyConfig"),
        );
        getLocalStorageObject.proxyType = "manual";
        getLocalStorageObject.ssl = "";

        // directly update http and https same value field firefox settings
        browser.proxy.settings.set({ value: getLocalStorageObject });

        let updateLocalStorage = JSON.stringify(getLocalStorageObject);
        localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);
      }
    }
  });

  //setup event for socks radio button
  Object(getSocksVersionRadio).forEach(function (item) {
    // let getItemValue = item.target.che

    item.addEventListener("click", function (input) {
      let getTargetValue = this.value;
      // Checking LocalStorage Config is exist or not
      let isSwitcherLocalStorageExist = localStorage.getItem(
        "SwitcherManualProxyConfig",
      );

      if (isSwitcherLocalStorageExist) {
        let getLocalStorageObject = JSON.parse(
          localStorage.getItem("SwitcherManualProxyConfig"),
        );
        let updateLocalStorage;
        switch (getTargetValue) {
          case "version4":
            getLocalStorageObject.socksVersion = 4;

            // directly update http and https same value field firefox settings
            browser.proxy.settings.set({ value: getLocalStorageObject });

            updateLocalStorage = JSON.stringify(getLocalStorageObject);

            localStorage.setItem(
              "SwitcherManualProxyConfig",
              updateLocalStorage,
            );
            break;
          case "version5":
            getLocalStorageObject.socksVersion = 5;

            // directly update http and https same value field firefox settings
            browser.proxy.settings.set({ value: getLocalStorageObject });

            updateLocalStorage = JSON.stringify(getLocalStorageObject);

            localStorage.setItem(
              "SwitcherManualProxyConfig",
              updateLocalStorage,
            );
            break;
        }
      }
    });
  });
}

// handeling event on key up when user work with manual config inputs
function handelEventOnKeyUpOnInputItem(input) {
  let getTargetValue = input.target.value;
  let getTargetId = input.target.id;

  // Checking LocalStorage Config is exist or not
  let isSwitcherLocalStorageExist = localStorage.getItem(
    "SwitcherManualProxyConfig",
  );

  // Making a localStorage Config if it's not exist
  if (isSwitcherLocalStorageExist) {
    let getLocalStorageObject = JSON.parse(
      localStorage.getItem("SwitcherManualProxyConfig"),
    );
    let updateLocalStorage;

    // handeling No Proxy Url for system and manual Proxy
    let getProxyType = findCurrentActiveButton();

    switch (getTargetId) {
      case "http-proxy-url":
        getLocalStorageObject.proxyType = "manual";

        getLocalStorageObject.http = getTargetValue.replaceAll(" ", "");

        // checking for checkbox that is enable if is, http and https value should be same
        let getCheckBoxStatus = isCheckBoxChecked("set-http-url-for-https");
        let getHttps;
        if (getCheckBoxStatus) {
          getHttps = document.getElementById("https-proxy-url");
          getHttps.value = getTargetValue.replaceAll(" ", "");
          getLocalStorageObject.ssl = getHttps.value;
        }

        // directly update http field in the firefox settings
        browser.proxy.settings.set({ value: getLocalStorageObject });

        updateLocalStorage = JSON.stringify(getLocalStorageObject);

        localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);

        // Show Current Proxy that is Set As Html Proxy field
        showCurrentHttpProxyThatIsSet(getLocalStorageObject.http);
        break;

      case "https-proxy-url":
        getLocalStorageObject.proxyType = "manual";
        getLocalStorageObject.ssl = getTargetValue.replaceAll(" ", "");
        // directly update https field in the firefox settings
        browser.proxy.settings.set({ value: getLocalStorageObject });

        updateLocalStorage = JSON.stringify(getLocalStorageObject);

        localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);
        break;

      case "socks-proxy-url":
        getLocalStorageObject.proxyType = "manual";
        getLocalStorageObject.socks = getTargetValue.replaceAll(" ", "");

        // directly update socks field in the firefox settings
        browser.proxy.settings.set({ value: getLocalStorageObject });

        updateLocalStorage = JSON.stringify(getLocalStorageObject);

        localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);
        break;

      case "noproxy-proxy-urls":
        getLocalStorageObject.passthrough = getTargetValue.replaceAll(" ", "");

        if (getProxyType == "system") {
          // Updating LocalStorage just with proxyType and passthrough field
          // Note : browser and LocalStorage same because if we update LocalStorage with system proxy settings
          //        we lose proxy manual state. to hold state for manual we don't update http , ssl and socks field
          //        in LocalStorage

          // update LocalStorage settings
          getLocalStorageObject.proxyType = getProxyType;
          updateLocalStorage = JSON.stringify(getLocalStorageObject);
          localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);

          // update browser system proxy settings
          let systemProxySettingForBrowser = getLocalStorageObject;
          systemProxySettingForBrowser.proxyType = getProxyType;
          systemProxySettingForBrowser.http = "";
          systemProxySettingForBrowser.ssl = "";
          systemProxySettingForBrowser.socks = "";

          // updating browser proxy config for system proxy
          browser.proxy.settings.set({ value: systemProxySettingForBrowser });
        } else {
          getLocalStorageObject.proxyType = "manual";

          // directly update noproxy for field in the firefox settings
          browser.proxy.settings.set({ value: getLocalStorageObject });

          updateLocalStorage = JSON.stringify(getLocalStorageObject);

          localStorage.setItem("SwitcherManualProxyConfig", updateLocalStorage);
        }

        break;
    }
  }
}

// handeling event on clipboard paste data when user paste ip:port in to manual config inputs
function handelEventOnPasteOnInputItem(input) {
  // disable direct paste to input field
  input.preventDefault();

  // update target value with clipboardData
  input.target.value = (input.clipboardData || window.clipboardData).getData(
    "text",
  );

  // when we update target value with clipboardData
  // we just need to do all task that we do in handelEventOnKeyUpOnInputItem function
  handelEventOnKeyUpOnInputItem(input);
}
