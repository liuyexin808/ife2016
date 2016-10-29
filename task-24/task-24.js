var node = $("#node"),	
	data = [],
	flag = false;

function $(ele) {
	return document.querySelector(ele);
}

function $$(ele) {
	return document.querySelectorAll(ele); 
}

//深度遍历
function traverseDF(node) {
	var len;
	if(node) {
		len = node.children.length;
		data.push(node);
		for(var i = 0; i < len; i++) {
			traverseDF(node.children[i]);
		}
	}
} 

//广度遍历
function traverseBF(node) {
	var queue = [];
	queue.push(node);
	while(queue.length != 0) {
		node = queue.shift();
		data.push(node);
		if(node.children) {
			for(var i = 0,len = node.children.length; i < len; i++) {
				queue.push(node.children[i]);
			}
		}	
	}
}

//重置数组和颜色
function reset() {
	data = [];
	flag = false;
	len = $$("div").length;
	for(var i = 0; i<len ; i++) {
		$$("div")[i].className ="recover";
	}
}

//设置速度
function setSpeed() {
	var speed = $("#range").value;
	return speed;
}

//找到查询目标
function searchTarget(val,i) {
	var content = data[i].firstChild.nodeValue;
	if(content.trim() == val) {
	data[i].className = "find";
	flag = true;
	return true;
	}
}

//目标结果提示
function searchResult(val,flag) {
	if(val && !flag) {
		alert("未找到目标");
	} 
	else if (val && flag) {
		alert("已找到目标");
	}
}

//渲染
function render(val) { 
	var	i = 0;
		data[i].className = "traverse";
	if(val) {
		searchTarget(val,i);
	}
	timer = setInterval(function() {
		i++;		
		if (i < data.length) {
			if(searchTarget(val,i-1)) {
				data[i].className = "traverse";
			} else {
			data[i-1].className ="recover";
			data[i].className = "traverse";
			}
			if(val) {
				searchTarget(val,i);
			}
		} else {
			clearInterval(timer);
			searchResult(val,flag);
			data[i-1].className = "recover";
			setDisabled();
		}  
	},setSpeed());
}

//禁止点击按钮
function setDisabled() {
 	var btn = $$("button"),
 		len = btn.length;
	for(var i = 0; i < len; i++) {
		if (!btn[i].disabled) {
		btn[i].setAttribute("disabled","true");
	  } else {
		btn[i].removeAttribute("disabled");
	  }
		
	}
}

//添加按钮
function addElement() {
	var val = $("#text").value.trim(),
		focusNode = $(".focus");
		if(!val || !focusNode) {return;}
	focusNode.innerHTML += "<div class='recover'>" + val +"</div>"; 
}

//删除按钮
function removeElement() {
	var focusNode = $(".focus");
		if(!focusNode) {return;}
	focusNode.parentNode.removeChild(focusNode);
}

//遍历方式
function method() {
	 reset();
	 setDisabled();
	 if($$("input")[0].checked) {
	 	traverseDF(node);
	 } else {
	 	traverseBF(node);
	 }
}

//遍历按钮
function traverse() {
	 method();
	 render();
}

//查询按钮
function serach() {
	var val = $("#content").value.trim();
	if(val == "") {
		alert("请输入查询目标");
	} else {
		method();
		render(val);
	}
}

//选中元素
function elementClick(e) {
	if(e.target.className == "recover") {
		reset();
		e.target.className = "focus";
	} else {
		e.target.className = "recover";
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

//事件绑定
function init() {
	addEvent($("#outer_1"),"click",elementClick);
	addEvent($$("button")[2],"click",addElement);
	addEvent($$("button")[3],"click",removeElement);
	addEvent($("#traverse"),"click",traverse);
	addEvent($("#search"),"click",serach);
}

init();

