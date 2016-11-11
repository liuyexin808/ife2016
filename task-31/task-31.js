(function(){


function changeRadio() {
	if($("#rd1").checked) {
		$("#outer_2").className = "visible";
		$("#company").className = "hidden";
	} else  {
		$("#company").className = "visible";
		$("#outer_2").className = "hidden";
	}
}

function changeOption() {
	var	data = {
		shanghai:["上海大学","复旦大学","交通大学"],
		beijing:["北京大学","清华大学","师范大学"],
		guangzhou:["中山大学","华南理工大学","华南师范大学"]
	},
	 	index = $("#city").selectedIndex,
	 	val = $("#city")[index].value,
	 	str = "";
	for(var i = 0; i < data[val].length; i++) {
		str += "<option>" + data[val][i] + "</option>";
	}
	$("#school").innerHTML = str;
}

function init() {
addEvent($("#outer_1"),"change",changeRadio);
addEvent($("#city"),"change",changeOption);
}

init();
})()