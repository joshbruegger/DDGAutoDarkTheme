function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

//xpath references
var darkTheme = getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[4]");
var lightTheme = [getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[1]"),
				  getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[2]"),
				  getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[3]")];
				  
//setting variables
var s_startH = 20;
var s_endH = 7;
var s_lightThemeIdx = 0;

function updateSettings(item) {
	
	if (item.startH) {
		var startH = item.startH.split(':');
		var startM = startH[1]!=0? startH[1]/60 : 0;
		s_startH = Number(startH[0]) + Number(startM);
	}

	if (item.endH){
		var endH = item.endH.split(':');
		var endM = endH[1]!=0? endH[1]/60 : 0;
		s_endH = Number(endH[0]) + Number(endM);
	}
	
	if (item.selectedTheme)
		s_lightThemeIdx = item.selectedTheme-1;
	
	//alert("startH: " + s_startH + " endH: " + s_endH + " theme= " + s_lightThemeIdx);
	UpdateTheme();
}

function UpdateTheme(){
	var d = new Date();
	var time = d.getHours() + d.getMinutes()/60;
	
	if (time >= s_startH || time <=s_endH){
		if (darkTheme.className != "nav-menu__theme  js-side-menu-theme theme-is-selected") {
			darkTheme.click();
		}
	}
	else {
		if (lightTheme[s_lightThemeIdx].className != "nav-menu__theme  js-side-menu-theme theme-is-selected") {
			lightTheme[s_lightThemeIdx].click();
		}
	}
}

function onError(error) {
  console.log(error)
}

//update settings...
browser.storage.local.get()
  .then(updateSettings, onError);

//TODO: toast/snackbar to disable extension for x amount of time
