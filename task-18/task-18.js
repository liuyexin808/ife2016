var data = [];

function $(id) {
	return document.getElementById(id);
}

//浏览器事件兼容
function addEvent(ele, event, hanlder) {
	if (ele.addEventListener) {
		ele.addEventListener(event, hanlder, false);
	} else if (ele.attachEvent) {
		ele.attachEvent('on' + event, hanlder);
	} else {
		ele['on' + event] = hanlder;
	}
}

//渲染数据
function render() {
	var str = "";
		len = data.length;
	for (var i = 0; i < len; i++) {
		str = str + "<div class='block'"+" id=" + i + ">" + data[i] + "</div>"
	}
	$("container").innerHTML = str;			
}

//添加数据
function pushData(e) {
	var val = $("content").value.trim(),
		e = event || window.event;
	if(/^[0-9]+$/.test(val) === false) {
		alert("请你输入数字！");
		return
	}
	if(e.target == $("pushright")) {
		data.push(val);
	}
	if(e.target == $("pushleft")) {
		data.splice(0,0,val);
	}
	render();
}

//移出数据
function popData(e) {
	var	e = event || window.event,
		result;
	if(e.target == $("popright")) {
		result = data.splice(-1,1);
	}
	if(e.target == $("popleft")) {
		result = data.splice(0,1);
	}
	render();
}

//点击删除数据
function handler(e) {
	var e = event || window.event,
		index;
	if(e.target === e.currentTarget) {
		return;
	}
	index = e.target.getAttribute("id");
	data.splice(index,1);
	render();
}

//事件绑定
function init() {
	addEvent($("outer_1"),"click",pushData);
	addEvent($("outer_2"),"click",popData);
	addEvent($("container"),"click",handler);
}
init()