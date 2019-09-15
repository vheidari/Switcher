
// 4th runed and add event listener on popup button list with id
document.onreadystatechange = function() {
    document.getElementById("noproxy-id").addEventListener("click", setNoProxySetting);
    document.getElementById("systemproxy-id").addEventListener("click", setSystemProxySetting);
    document.getElementById("manualproxy-id").addEventListener("click", setManualProxySetting);
}

// runed when user clicked on noproxy button
function setNoProxySetting() {

  let noProxySetting = {
    proxyType: "none",
  };

  browser.proxy.settings.set({value: noProxySetting});

  let noproxy = document.getElementById("noproxy-id");
  noproxy.classList.add("active");

  // call setBadgeText function from browserAction.js
  setBadgeText("N");

  let noProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
  noProxySetIcon[0].src = "../images/icons/set_noproxy.png";

  let noproxyText = document.getElementsByClassName("noproxy-text");
  noproxyText[0].innerText = "You Are Using No Proxy Mode";

  let systemproxyText = document.getElementsByClassName("systemproxy-text");
  systemproxyText[0].innerText = "Switch To System Proxy";


  let systemproxy = document.getElementById("systemproxy-id");
  systemproxy.classList.remove("active");

}

// runed when user clicked on systemproxy button
function setSystemProxySetting() {

  let systemProxySetting = {
    proxyType: "system",
  };

  browser.proxy.settings.set({value: systemProxySetting});

  let systemproxy = document.getElementById("systemproxy-id");
  systemproxy.classList.add("active");

  // call setBadgeText function from browserAction.js
  setBadgeText("S");

  let systemProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
  systemProxySetIcon[0].src = "../images/icons/set_systemproxy.png";

  let noproxyText = document.getElementsByClassName("noproxy-text");
  noproxyText[0].innerText = "Switch To No Proxy";

  let systemproxyText = document.getElementsByClassName("systemproxy-text");
  systemproxyText[0].innerText = "You Are Using System Proxy Mode";

  let noproxy = document.getElementById("noproxy-id");
  noproxy.classList.remove("active");
}

// runed when user clicked on manualproxy button
function setManualProxySetting() {
   // noting
   /*
    let manualProxySetting = {
      proxyType: "manual",
      http: "http://example.org:8080",
      socks: "127.0.0.1:1212",
      socksVersion: 5,
      passthrough: ".example.org"
    };


    browser.proxy.settings.set({value: systemProxySetting});
    console.log("setManualProxySetting");
  */
}



// 3th runed and checked current proxy type and update popup button list current proxy used
function currentProxyType(proxyType) {
  if(proxyType == "none")
  {
    let noproxy = document.getElementById("noproxy-id");
    noproxy.classList.add("active");

    let noproxyText = document.getElementsByClassName("noproxy-text");
    noproxyText[0].innerText = "You Are Using No Proxy Mode";

    // call setBadgeText function from browserAction.js
    setBadgeText("N");

    let noProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
    noProxySetIcon[0].src = "../images/icons/set_noproxy.png";


    let systemproxyText = document.getElementsByClassName("systemproxy-text");
    systemproxyText[0].innerText = "Switch To System Proxy";
  }
  else if(proxyType == "system")
  {
    let systemproxy = document.getElementById("systemproxy-id");
    systemproxy.classList.add("active");

    let noproxyText = document.getElementsByClassName("noproxy-text");
    noproxyText[0].innerText = "Switch To No Proxy";

    // call setBadgeText function from browserAction.js
    setBadgeText("S");

    let systemProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
    systemProxySetIcon[0].src = "../images/icons/set_systemproxy.png";

    let systemproxyText = document.getElementsByClassName("systemproxy-text");
    systemproxyText[0].innerText = "You Are Using System Proxy Mode";
  }
  else if(proxyType == "manual")
  {
    // todo add manual config

    let manualproxy = document.getElementById("manualproxy-id");
    manualproxy.classList.add("active");

    // call setBadgeText function from browserAction.js
    setBadgeText("M");

  }

}


// 2th runed and it's get proxy type then send it as an argument to currentProxyType function
function gotProxyType(popupURL) {
  browser.proxy.settings.get({}).then(function(proxyInfo){ currentProxyType(proxyInfo.value.proxyType); });
}

// 1th runed and call gotProxyType function
var gettingPopup = browser.browserAction.getPopup({});
gettingPopup.then(gotProxyType);
