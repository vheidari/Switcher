
//Fire when user clicked on noproxy button
function setNoProxySetting() {

  let noProxySetting = {
    proxyType: "none",
  };

  browser.proxy.settings.set({value: noProxySetting});

  let noproxy = document.getElementById("noproxy-id");
  noproxy.classList.add("active");

  // call setBadgeText function from browse_actions.js
  setBadgeText("N");

  let noProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
  noProxySetIcon[0].src = "../images/icons/set_noproxy.png";

  let noproxyText = document.getElementsByClassName("noproxy-text");
  noproxyText[0].innerText = "No Proxy Mode Is Set";

  let systemproxyText = document.getElementsByClassName("systemproxy-text");
  systemproxyText[0].innerText = "Switch To System Proxy";

  let systemproxy = document.getElementById("systemproxy-id");
  systemproxy.classList.remove("active");
  
  //panel shortcut handeling
  let systemproxyShortcut = document.getElementById("systemproxy-shortcut");
  systemproxyShortcut.classList.add("shortcut-active");
  
  let noproxyShortcut = document.getElementById("noproxy-shortcut");
  noproxyShortcut.classList.remove("shortcut-active");
}

//Fire when user clicked on systemproxy button
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
  systemproxyText[0].innerText = "System Proxy Is Set ";

  let noproxy = document.getElementById("noproxy-id");
  noproxy.classList.remove("active");
  
  //panel shortcut handeling
  let systemproxyShortcut = document.getElementById("systemproxy-shortcut");
  systemproxyShortcut.classList.remove("shortcut-active");
  
  let noproxyShortcut = document.getElementById("noproxy-shortcut");
  noproxyShortcut.classList.add("shortcut-active");
}

//Fire when user clicked on manualproxy button
function setManualProxySetting() {
   // completed in next version 
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



//Fire 3th and checked current proxy type and update popup button list current proxy used
function setupSwitcher(proxyType) {
  
  //Setup switcher version
  let version = browser.runtime.getManifest().version;
  document.getElementById("switcher-version").textContent = "version : " + version;

  //Setup swithcer for current proxy mode
  if(proxyType == "none")
  {
    let noproxy = document.getElementById("noproxy-id");
    noproxy.classList.add("active");

    let noproxyText = document.getElementsByClassName("noproxy-text");
    noproxyText[0].innerText = "No Proxy Mode Is Set";

    // call setBadgeText function from browserAction.js
    setBadgeText("N");

    let noProxySetIcon = document.getElementsByClassName("Switcher-icon-status");
    noProxySetIcon[0].src = "../images/icons/set_noproxy.png";

    let systemproxyText = document.getElementsByClassName("systemproxy-text");
    systemproxyText[0].innerText = "Switch To System Proxy";
	
	let systemproxyShortcut = document.getElementById("systemproxy-shortcut");
	systemproxyShortcut.classList.add("shortcut-active");
  
	let noproxyShortcut = document.getElementById("noproxy-shortcut");
	noproxyShortcut.classList.remove("shortcut-active");
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
    systemproxyText[0].innerText = "System Proxy Is Set";
	
	let systemproxyShortcut = document.getElementById("systemproxy-shortcut");
	systemproxyShortcut.classList.remove("shortcut-active");
  
	let noproxyShortcut = document.getElementById("noproxy-shortcut");
	noproxyShortcut.classList.add("shortcut-active");
	
  }
  else if(proxyType == "manual")
  {
    // todo add manual config
    let manualproxy = document.getElementById("manualproxy-id");
    manualproxy.classList.add("active");

    // call setBadgeText function from browser_action.js
    setBadgeText("M");

  }

}


