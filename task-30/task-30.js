var arr = [
	["必填,名称长度为4-16个字符","名称格式正确","名称格式错误"],
	["必填,密码长度6～14位字符","密码格式正确","密码格式错误"],
	["请重复输入密码","密码输入一致","密码输入不一致"],
	["必填,example@example.com","邮箱格式正确","邮箱格式错误"],
	["必填,请输入11位手机号码","手机格式正确","手机格式错误"]
]	
	content = $$("input"),
	info = $$(".info");

function validate(i) {
	var val = content[i].value.trim(),
		flag;
		if(!val) {
			validateEmpty(i);
			return;
		}
		switch(i) {
			case 0: if(countLength(val) >= 4 && countLength(val) <= 16 ) {
					flag =  true;
				}	
				break;
			case 1: if(countLength(val) >= 6 && countLength(val) <= 14) {
					flag =  true;
				}	
				break;
			case 2: if(val == content[1].value) {
					flag =  true;
				}	
				break;
			case 3: if(/^[a-z_0-9.-]{1,64}@([a-z0-9-]{1,200}.){1,5}[a-z]{1,6}$/i.test(val)) {
					flag =  true;
				}
				break;
			case 4: if(/^1\d{10}$/.test(val)) {
					flag =  true;
				}
				break;
		}
		if(flag) {
			validateCorrect(i);
		} else {
			validateIncorrect(i);
		}
}

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

function validateCorrect(i) {
	content[i].className = "correct_content";
	info[i].className = "correct_info";
	info[i].innerHTML = arr[i][1];
}

function validateIncorrect(i) {
	content[i].className = "incorrect_content";
	info[i].className = "incorrect_info";
	info[i].innerHTML = arr[i][2];
}

function validateEmpty(i) {
	content[i].className = "incorrect_content";
	info[i].className = "incorrect_info";
	info[i].innerHTML = "输入不得为空"
}

function focusHandler() {
	function helper(i) {
		return function () {
			 info[i].innerHTML = arr[i][0];
			 info[i].className = "info";
			 content[i].className = "content";
		}
	}
	for(var i = 0;i < content.length; i++) {
		addEvent(content[i],"focus",helper(i)) 
	}
}

function blurHandlder() {
	function helper(i) {
		return function() {
			validate(i);
		}
	}
	for(var i = 0;i < content.length; i++) {
		addEvent(content[i],"blur",helper(i)) 
	}
}

function sumbit() {
	var flag = 0;
	for (var i = 0;i < content.length;i++ ) {
		if(content[i].className == "correct_content") {
			flag += 1;
		} else {
			flag -= 1;
		}
	}
	if (flag === content.length) {
		alert("提交成功")
	} else {
		alert("提交失败")
	}
}

(function init() {
	focusHandler();
	blurHandlder();
	addEvent($("button"),"click",sumbit);
})()