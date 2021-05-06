


    // switcher swith command 
    // switch command :
    // - switch  command define in manifetst.json 
    // - it toggle proxy setting between system proxy and manual proxy
    browser.commands.onCommand.addListener(function(command){
	if (command === "switch") {
	
	 browser.proxy.settings.get({}).then(function(proxyInfo) {
		switch(proxyInfo.value.proxyType) 
		 {
			 case "none":
			  setBadgeText("S");
		 	  let systemProxySetting = {
    				proxyType: "system",
  			  };

  			  browser.proxy.settings.set({value: systemProxySetting});
	 		  break;
			
			 case "system":
  			  setBadgeText("N");
		 	  let noProxySetting = {
    			 	proxyType: "none",
  			  };

  			  browser.proxy.settings.set({value: noProxySetting});
			  break;

			 default:
		           break;
		 }
	 });

	}
    });
	
  
    
    //Suggest Switcher ADD-ONS home page in omnibox     
    browser.omnibox.onInputStarted.addListener( function() {	
        browser.omnibox.setDefaultSuggestion({
  	  description: "Go to Switcher ADD-ONS page"
    	});
    });    

    //Go to Switcher ADD-ONS home page on firefox ADD-ONS
    browser.omnibox.onInputEntered.addListener(function() {
    	browser.tabs.update({url:"http://addons.mozilla.org/en-US/firefox/addon/switcher_proxy/"});
    });





















