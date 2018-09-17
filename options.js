function saveOptions(e) {
  e.preventDefault();
  
  //get theme selected
  var data = new FormData(document.querySelector("form"))
  var selectedTheme = 1;
  for (const entry of data) {
    selectedTheme = entry[1];
  };
  
  //get selected start time, convert from hh:mm to hours
  var tmp_startH = document.getElementById("startH").value.split(':');
  startM = tmp_startH[1]!=0? tmp_startH[1]/60 : 0;
  startH = Number(tmp_startH[0]) + Number(startM);
  
  //get selected end time, convert from hh:mm to hours
  var tmp_endH = document.getElementById("endH").value.split(':');
  endM = tmp_endH[1]!=0? tmp_endH[1]/60 : 0;
  endH = Number(tmp_endH[0]) + Number(endM);
  
  //save settings locally
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
		document.getElementById("startH").value = ('0' + Math.floor(item.startH)).slice(-2) + ":" + ('0' + Math.round((item.startH-Math.floor(item.startH))*60)).slice(-2);
		document.getElementById("endH").value = ('0' + Math.floor(item.endH)).slice(-2) + ":" + ('0' + Math.round((item.endH-Math.floor(item.endH))*60)).slice(-2);
		document.getElementById("theme"+item.selectedTheme).checked = true;
		
		document.querySelector("#log").innerText = "retrieved: theme=" + item.selectedTheme + " startH: " + item.startH + " endH: " + item.endH;
	}
	
	browser.storage.local.get()
	.then(setChosen, onError);
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);