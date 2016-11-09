function countLength(str) {
	var charCode,
		result = 0,
		len=str.length;
	for(var i = 0;i < len;i++) {
		charCode = str[i].charCodeAt(0);
		if(charCode >= 0 && charCode <= 128) {
			result += 1;
		} else {
			result += 2;
		}
	}
	return result;
}

function validate() {
	var input= $("input"),
		content = $("#content"),
		val = input.value.trim();
	if (countLength(val) == 0) {
		content.innerHTML = "姓名不能为空";
		content.className = "incorrect_1";
		input.className = "incorrect_2";
	} else if (countLength(val) > 4 && countLength(val) < 16 ) {
		content.innerHTML = "名称格式正确";
		content.className = "correct_1";
		input.className = "correct_2";
	} else {
		content.innerHTML = "请输入长度为4~16位字符";
		content.className = "incorrect_1";
		input.className = "incorrect_2";
	}
}

function init() {
	addEvent($("button"),"click",validate);
}

init()