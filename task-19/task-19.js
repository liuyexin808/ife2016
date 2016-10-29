function $(id) {
	return document.getElementById(id);
}
var data = [];

//渲染
function render() {
	var len = data.length,
		result;
	$("container").innerHTML = "";
	for(var i = 0; i < len; i++) {
		result = document.createElement("div");
		result.innerText = data[i];
		result.style.height = data[i]*4+"px";
		result.className = "block";
		result.setAttribute("id",i);
		$("container").appendChild(result);
	}
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

//添加数据
function pushData(e) {
	var val = $("content").value.trim(),
		e = event || window.event;
	if(judge(val) === false) {
		return;
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
	var	e = event || window.event;
	if(e.target == $("popright")) {
		data.splice(-1,1);
	}
	if(e.target == $("popleft")) {
		data.splice(0,1);
	}
	render();
}

//判断输入
function judge(val) {
	if(/^[0-9]+$/.test(val) == false) {
		alert("输入数字");
		return false;
	}
	if(val < 10 || val >100) {
		alert("输入10-100之间");
		return false;
	}
	if(data.length>60) {
		alert("队列最多为60个");
		return false;
	}
}

//随机50个队列
function random() {
	var num;
		data = [];
	for(var i = 0;i < 50; i++) {
		num = Math.round((Math.random()*9+1)*10);
		data.push(num);
	}
	render();
}
//冒泡排序
function bubble() {
	var i = 0,
		j = 0,
		len = data.length,
		temp,
		timer;
	timer = setInterval(function() {
		//原始方法
		if(i <len){
			if(j<len-i-1){
				if(data[j]>data[j+1]) {
					temp = data[j+1];
					data[j+1] = data[j];
					data[j] = temp;
					render();
				}
				j++;
			} else{
				j = 0;
				i++;
			}	
		}
		else{
			clearInterval(timer);
		}
		/*//拆解if
		if(i >= len) {
			clearInterval(timer);
		}
		if(j >= len-i-1){
			j = 0;i++;
		}
		if(data[j]>data[j+1]) {
			temp = data[j+1];
			data[j+1] = data[j];
			data[j] = temp;
			render();
		}
		j++;*/
	},10);
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
	addEvent($("random"),"click",random);
	addEvent($("bubble"),"click",bubble);
}

init();