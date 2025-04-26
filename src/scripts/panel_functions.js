//Fire when user clicked on noproxy button
function setNoProxySetting() {
  let noProxySetting = {
    proxyType: "none",
  };

  browser.proxy.settings.set({ value: noProxySetting });
  // disable active green pint on system proxy / manual proxy button
  currectActiveButton("noproxy-id");

  // call setBadgeText function from browse_actions.js
  setBadgeText("N");

  //
  setSwitcherIconSatus("noproxy");

  //
  setSwitcherButtonIsSet("noproxy");

  //panel shortcut handeling
  deactiveShortcutActive("noproxy-shortcut");

  // hide lable that show current http proxy
  hideCurrentHttpProxyThatIsSet();
}

//Fire when user clicked on systemproxy button
function setSystemProxySetting() {
  let systemProxySetting;

  // Checking LocalStorage Config is exist or not
  let isSwitcherLocalStorageExist = localStorage.getItem(
    "SwitcherManualProxyConfig",
  );

  if (isSwitcherLocalStorageExist) {
    let getProxySetting = JSON.parse(
      localStorage.getItem("SwitcherManualProxyConfig"),
    );
    systemProxySetting = {
      proxyType: "system",
      passthrough: getProxySetting.passthrough,
    };
  } else {
    systemProxySetting = {
      proxyType: "system",
    };
  }

  browser.proxy.settings.set({ value: systemProxySetting });

  // disable active green point on no proxy / manual proxy button
  currectActiveButton("systemproxy-id");

  // call setBadgeText function from browserAction.js
  setBadgeText("S");

  setSwitcherIconSatus("systemproxy");

  setSwitcherButtonIsSet("systemproxy");

  //panel shortcut handeling
  deactiveShortcutActive("systemproxy-shortcut");

  // hide lable that show current http proxy
  hideCurrentHttpProxyThatIsSet();
}

//Fire when user clicked on manualproxy button
function setManualProxySetting() {
  // disable active green point on no proxy / system proxy button
  currectActiveButton("manualproxy-id");

  // call setBadgeText function from browse_actions.js
  setBadgeText("M");

  // change status Icon to manual icon
  setSwitcherIconSatus("manualproxy");

  // updating no proxy / system proxy  / manual proxy text
  setSwitcherButtonIsSet("manualproxy");

  // Checking LocalStorage Config is exist or not
  let isSwitcherLocalStorageExist = localStorage.getItem(
    "SwitcherManualProxyConfig",
  );

  // Making sure localStorage Config for Swithcer is exist
  if (!isSwitcherLocalStorageExist) {
    // call manualProxyFormHandler because if LocalStorage isn't exist it make new LocalStorage
    // and open form for user to config proxy setting for manual
    manualProxyFormHandler();
  } else {
    // get manualProxySetting from LocalStorage and update firefox manual proxy setting
    let manualProxySetting = JSON.parse(
      localStorage.getItem("SwitcherManualProxyConfig"),
    );
    manualProxySetting.proxyType = "manual";
    browser.proxy.settings.set({ value: manualProxySetting });

    // Todo fix this
    // update localStorage
    // localStorage.setItem(
    //   "SwitcherManualProxyConfig",
    //   JSON.stringify(manualProxySetting),
    // );

    // show current http proxy that is set as http
    showCurrentHttpProxyThatIsSet(manualProxySetting.http);
  }

  //panel shortcut handeling
  deactiveShortcutActive("manualproxy-shortcut");
}

// Fire when user clicked on manualproxy config button
// this function handel manualproxy form inputs
function manualProxyFormHandler() {
  // Check Form is collapsed or not
  let isElementCollapsed = document.getElementsByClassName(
    "manualproxy-config-form-elements",
  )[0].classList.length;

  if (isElementCollapsed > 1) {
    document
      .getElementsByClassName("manualproxy-config-form-elements")[0]
      .classList.remove("hide-element");

    document
      .getElementById("manualproxy-config-button-id")
      .classList.add("manualproxy-config-button-active");
  } else {
    document
      .getElementsByClassName("manualproxy-config-form-elements")[0]
      .classList.add("hide-element");

    document
      .getElementById("manualproxy-config-button-id")
      .classList.remove("manualproxy-config-button-active");
  }

  // Check LocalStorage Config is exist or not
  let isSwitcherLocalStorageExist = localStorage.getItem(
    "SwitcherManualProxyConfig",
  );

  // Making a localStorage Config if it's not exist
  if (!isSwitcherLocalStorageExist) {
    let manualProxySetting = {
      proxyType: "manual",
      http: "", // for http
      ssl: "", //for https
      socks: "", // for socks
      socksVersion: 4, // for socks version
      passthrough: "", // for no proxy for
    };
    localStorage.setItem(
      "SwitcherManualProxyConfig",
      JSON.stringify(manualProxySetting),
    );

    // Setup Form inputs Events
    setManualProxyFormEvents();
  } else {
    // Fill form fields with LocalStorage config data
    let getLocalStorageObject = JSON.parse(isSwitcherLocalStorageExist);
    let getAllInputField = document.querySelectorAll("input[type='text']");

    let getHttpUrlValue;
    Object(getAllInputField).forEach(function (item) {
      switch (item.id) {
        case "http-proxy-url":
          item.value = getLocalStorageObject.http;
          break;
        case "https-proxy-url":
          item.value = getLocalStorageObject.ssl;
          break;
        case "socks-proxy-url":
          item.value = getLocalStorageObject.socks;
          break;
        case "noproxy-proxy-urls":
          item.value = getLocalStorageObject.passthrough;
          break;
      }
    });

    // checking if http == https then checkbox should be checked
    if (
      getLocalStorageObject.http == getLocalStorageObject.ssl &&
      getLocalStorageObject.http != "" &&
      getLocalStorageObject.ssl != ""
    ) {
      let getHttpForHttpsCheckbox = document.getElementById(
        "set-http-url-for-https",
      );
      getHttpForHttpsCheckbox.checked = true;
    }

    // checking radio box selection through socksVersion item in LocalStorage object
    let getSocksVersionRadio = document.querySelectorAll("input[type='radio']");
    Object(getSocksVersionRadio).forEach(function (item) {
      item.checked = false;

      if (getLocalStorageObject.socksVersion == 4 && item.id == "version4") {
        item.checked = true;
      } else if (
        getLocalStorageObject.socksVersion == 5 &&
        item.id == "version5"
      ) {
        item.checked = true;
      }
    });

    // when LocalStorage is exist call the setManualProxyFormEvents
    // to setup all input field events
    setManualProxyFormEvents();
  }
}

//Fire 3th and checked current proxy type and update popup button list current proxy used
function setupSwitcher(proxyType) {
  // Get Os Name through navigator.userAgent API
  let osName = "unknown";

  osName = userAgentParser(navigator.userAgent);

  setOsIcon(osName);

  //Setup switcher version
  let version = browser.runtime.getManifest().version;
  document.getElementById("switcher-version").textContent =
    "version : " + version;

  //Setup swithcer for current proxy mode
  if (proxyType == "none") {
    currectActiveButton("noproxy-id");
    // call setBadgeText function from browserAction.js
    setBadgeText("N");

    //
    setSwitcherIconSatus("noproxy");

    //
    setSwitcherButtonIsSet("noproxy");

    //panel shortcut handeling
    deactiveShortcutActive("noproxy-shortcut");
    //
  } else if (proxyType == "system") {
    //
    currectActiveButton("systemproxy-id");
    // call setBadgeText function from browserAction.js
    setBadgeText("S");

    //
    setSwitcherIconSatus("systemproxy");

    //
    setSwitcherButtonIsSet("systemproxy");

    //panel shortcut handeling
    deactiveShortcutActive("systemproxy-shortcut");

    //
  } else if (proxyType == "manual") {
    //
    currectActiveButton("manualproxy-id");

    // call setBadgeText function from browser_action.js
    setBadgeText("M");

    setSwitcherIconSatus("manualproxy");

    setSwitcherButtonIsSet("manualproxy");

    //panel shortcut handeling
    deactiveShortcutActive("manualproxy-shortcut");

    // Checking LocalStorage Config is exist or not
    let isSwitcherLocalStorageExist = localStorage.getItem(
      "SwitcherManualProxyConfig",
    );

    if (isSwitcherLocalStorageExist) {
      let manualProxySetting = JSON.parse(
        localStorage.getItem("SwitcherManualProxyConfig"),
      );
      // show current http proxy that is set as http
      showCurrentHttpProxyThatIsSet(manualProxySetting.http);
    }
  }
}

// Checking a api in browser is exsist or not
function isApiExist(api) {
  return api !== undefined;
}

// To Identyfy user system and select proper icon for system Proxy
function userAgentParser(ua) {
  if (/windows|win32|win64/i.test(ua)) return "windows";
  if (/macintosh|mac os x/i.test(ua)) return "mac";
  if (/linux/i.test(ua)) return "linux";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/openbsd/i.test(ua)) return "openbsd";
  if (/freebsd/i.test(ua)) return "freebsd";

  return "unknown";
}

// select curret active button and add green point light on it
function currectActiveButton(targetId) {
  let getListOfButtons = document.querySelectorAll(".switcher-button");
  Object(getListOfButtons).forEach(function (item) {
    if (targetId == item.id) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function findCurrentActiveButton() {
  let getListOfButtons = document.querySelectorAll(".switcher-button");
  let proxyType;
  Object(getListOfButtons).forEach(function (item) {
    if (item.classList.contains("active")) {
      switch (item.id) {
        case "noproxy-id":
          proxyType = "none";
          break;
        case "systemproxy-id":
          proxyType = "system";
          break;
        case "manualproxy-id":
          proxyType = "manual";
          break;
      }
    }
  });

  return proxyType;
}

// Management shortcut text on button - deactive curret sellected button
function deactiveShortcutActive(targetId) {
  let getListOfShortcutActive = document.querySelectorAll(".shortcut-switch");
  Object(getListOfShortcutActive).forEach(function (item) {
    if (targetId == item.id) {
      item.classList.remove("shortcut-active");
    } else {
      item.classList.add("shortcut-active");
    }
  });
}

// Manage main icon of the Switcher
function setSwitcherIconSatus(iconId) {
  let switcherIcon = document.getElementsByClassName("Switcher-icon-status");
  let swticherIconShadow = document.getElementsByClassName("icon");
  if (iconId == "noproxy") {
    switcherIcon[0].src = "../images/icons/set_noproxy.png";
    // swticherIconShadow[0].classList.add("red-shadow");
    // swticherIconShadow[0].classList.remove("green-shadow");
    // swticherIconShadow[0].classList.remove("blue-shadow");
  }

  if (iconId == "systemproxy") {
    switcherIcon[0].src = "../images/icons/set_systemproxy.png";
    // swticherIconShadow[0].classList.add("green-shadow");
    // swticherIconShadow[0].classList.remove("red-shadow");
    // swticherIconShadow[0].classList.remove("blue-shadow");
  }

  if (iconId == "manualproxy") {
    switcherIcon[0].src = "../images/icons/set_manualproxy.png";
    // swticherIconShadow[0].classList.add("blue-shadow");
    // swticherIconShadow[0].classList.remove("red-shadow");
    // swticherIconShadow[0].classList.remove("green-shadow");
  }
}

// Manage button text that which button was selected
function setSwitcherButtonIsSet(targetId) {
  let buttonName;
  document.querySelectorAll(".switcher-button>span").forEach((item) => {
    if (/-text/i.test(item.className)) {
      let targetIdRegexPattern = new RegExp(`${targetId}`, "i");
      if (targetIdRegexPattern.test(item.className)) {
        buttonName = item.getAttributeNode("data-name").value;
        item.innerText = "";
        item.innerText = buttonName + " Mode is Set";
      } else {
        if (/Set/i.test(item.innerText)) {
          buttonName = item.getAttributeNode("data-name").value;
          item.innerText = "";
          item.innerText = "Switch To " + buttonName;
        }
      }
    }
  });
}

function showCurrentHttpProxyThatIsSet(httpValue) {
  if (httpValue && httpValue.length <= 22) {
    // Show current manual proxy that set as http
    document
      .getElementById("manualproxy-current-http-setting")
      .classList.remove("hide-element");

    httpValue = httpValue.replaceAll("http://", "");
    httpValue = httpValue.replaceAll("https://", "");
    httpValue = httpValue.replaceAll("://", "");

    document.getElementById("manualproxy-show-current-http-proxy").innerText =
      httpValue;
  }
}

function hideCurrentHttpProxyThatIsSet() {
  let getElement = document.getElementById("manualproxy-current-http-setting");
  let isHideElemenExist = false;
  getElement.classList.forEach((item) => {
    if (item == "hide-element") {
      isHideElemenExist = true;
    }
  });

  if (!isHideElemenExist) {
    getElement.classList.add("hide-element");
  }
}

function isCheckBoxChecked(id) {
  const getCheckBox = document.getElementById(id);
  if (getCheckBox.checked) {
    return true;
  }
  return false;
}
