function setBadgeText(text) {
  switch (text) {
    case "N":
      browser.browserAction.setBadgeText({ text: "N" });
      browser.browserAction.setBadgeTextColor({ color: "#fff" });
      browser.browserAction.setBadgeBackgroundColor({ color: "#c23c37" });
      break;
    case "S":
      browser.browserAction.setBadgeText({ text: "S" });
      browser.browserAction.setBadgeTextColor({ color: "#fff" });
      browser.browserAction.setBadgeBackgroundColor({ color: "#12bc00" });
      break;
    case "A":
      browser.browserAction.setBadgeText({ text: "A" });
      browser.browserAction.setBadgeTextColor({ color: "#fff" });
      browser.browserAction.setBadgeBackgroundColor({ color: "#5FC1A6" });
      break;
    case "M":
      browser.browserAction.setBadgeText({ text: "M" });
      browser.browserAction.setBadgeTextColor({ color: "#fff" });
      browser.browserAction.setBadgeBackgroundColor({ color: "#075389" });
      break;
    default:
      return;
  }
}

function setOsIcon(osName) {
  const getSystemOs = document.getElementsByClassName("system-os")[0];

  switch (osName) {
    case "linux":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-linux");
      break;

    case "openbsd":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-openbsd");
      break;

    case "freebsd":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-freebsd");
      break;

    case "ios":
    case "mac":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-mac");
      break;

    case "windows":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-win");
      break;

    case "android":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-android");
      break;

    case "cros":
      getSystemOs.classList.remove("system-os-unknown");
      getSystemOs.classList.add("system-os-cros");
      break;

    case "unknown":
      getSystemOs.classList.add("system-os-unknown");
  }
}
