

function setBadgeText(text) {
  switch (text)
  {
    case "N":
      browser.browserAction.setBadgeText({text: "N"});
      browser.browserAction.setBadgeTextColor({color: "#fff"});
      browser.browserAction.setBadgeBackgroundColor({color: "#c23c37"});
      break;
    case "S":
      browser.browserAction.setBadgeText({text: "S"});
      browser.browserAction.setBadgeTextColor({color: "#fff"});
      browser.browserAction.setBadgeBackgroundColor({color: "#12bc00"});
      break;
    case "A":
      browser.browserAction.setBadgeText({text: "A"});
      browser.browserAction.setBadgeTextColor({color: "#fff"});
      browser.browserAction.setBadgeBackgroundColor({color: "#5FC1A6"});
      break;
    case "M":
      browser.browserAction.setBadgeText({text: "M"});
      browser.browserAction.setBadgeTextColor({color: "#fff"});
      browser.browserAction.setBadgeBackgroundColor({color: "#075389"});
      break;
    default:
      return;

  }
}
