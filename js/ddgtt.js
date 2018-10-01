//xpath references
var darkTheme = getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[4]"); //dark theme button
var lightTheme = [getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[1]"),
				  				getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[2]"),
				  				getElementByXpath("/html/body/div[2]/div[6]/ul/ul[1]/li[2]/ul/li[3]")]; //light themes buttons


//setting variables
var s_startH = 20; //hour from which dark theme is turned on
var s_endH = 7; //hour from which dark theme is turned on
var s_lightThemeIdx = 0; //selected light theme. 0=standard  1=dark standard  2=Google style
var s_cooldownLenght = 1; //cooldown length in hours

//update settings then update theme
browser.storage.local.get()
  .then(UpdateSettings, onError);

//--FUNCTIONS--

/// gets element from xpath
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

/// called if any errors occur
function onError(error) {
  console.log(error)
}

/// gets settings stored locally, if existent, then runs UpdateTheme()
function UpdateSettings(item) {

	if (item.startH) //!=null
		s_startH = item.startH;

	if (item.endH) //!=null
		s_endH = item.endH;

	if (item.selectedTheme) //!=null
		s_lightThemeIdx = item.selectedTheme-1;

	//if (item.cooldownLenght) //!=null
		//s_cooldownLenght = item.cooldownLenght;

	//if (!item.lastCooldown) // =null
		//browser.storage.local.set({lastCooldown: 0});

	//if (Date.now() - item.lastCooldown >= s_cooldownLenght*3600000)
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

	//utilize existent DDG's "theme changed" snackbar for cooldown feature?
}
