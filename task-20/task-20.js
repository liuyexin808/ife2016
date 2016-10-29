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
function render(data) {
	var str = "",
		len = data.length;
	for (var i = 0; i < len; i++) {
		str += "<div class='block'" + "id='"+ i + "'>" + data[i] +"</div>";
	}
	$("container").innerHTML = str;
}

//获取内容
function getText() {
	var val = $("textArea").value.trim(),
		content = val.split(/[^0-9A-Za-z\u4E00-\u9FA5]+/g);
		for(var i = 0,len =content.length; i <len; i++) {
		if(content[i] == "") {
			content.splice(i,1);
		}
	}
	data = data.concat(content);
	render(data);
	clearValue($("textArea"));
}

//搜寻内容并变色
function searchText() {
	var val = $("text").value.trim(),
		regexp = new RegExp(val),
		str = "<span style='color:black'>" + val + "</span>";
	newData = data.map(function(item) {
			return item.replace(regexp,str);
		});
	render(newData);
}

//清除内容
function clearValue(id) {
	 id.value = "";
}

//点击删除
function handler(e) {
	var e = event || window.event,
		index;
	if (e.target === e.currentTarget) {
		return;
	}
	index = e.target.getAttribute("id");
	data.splice(index,1);
	render(data);
}

//事件绑定
function init() {
	addEvent($("btn"),"click",getText);
	addEvent($("search"),"click",searchText);
	addEvent($("container"),'click',handler);
}

init();