function saveOptions(e) {
  e.preventDefault();
  
  var data = new FormData(document.querySelector("form"))
  var selectedTheme = 1;
  for (const entry of data) {
    selectedTheme = entry[1];
  };
  
  var startH = document.getElementById("startH").value;
  var endH = document.getElementById("endH").value
  
  browser.storage.local.set({startH, endH, selectedTheme});
  
  //debug
  browser.storage.local.get()
  .then(debug, onError);
  
}

function debug(item) {
	document.querySelector("#log").innerText = "updated: theme=" + item.selectedTheme + " startH: " + item.startH + " endH: " + item.endH;
}

function onError(error) {
  console.log(error)
}

function restoreOptions() {
	
	function setChosen (item) {
		document.getElementById("startH").value = item.startH;
		document.getElementById("endH").value = item.endH;
		document.getElementById("theme"+item.selectedTheme).checked = true;
		
		document.querySelector("#log").innerText = "retrived: theme=" + item.selectedTheme + " startH: " + item.startH + " endH: " + item.endH;
	}
	
	browser.storage.local.get()
	.then(setChosen, onError);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);