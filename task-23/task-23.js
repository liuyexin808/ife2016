var node = $("#node"),	
	parent = $("#outer"),
	odiv = document.getElementsByTagName("div"),
	data = [],
	flag = false,
	disabled = true;

function $(ele) {
	return document.querySelector(ele);
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

//进行查询
function search(val,i) {
	var content = data[i].firstChild.nodeValue;
		if(content.trim() == val) {
		data[i].className = "find";
		flag = true;
		return true;
	}
}

//查询判断
function isSearch() {
	var val = $("#content").value.trim();
	if(val == "") {
		alert("请输入查询目标");
		return false;
	}
	return val;
}

//禁止按钮
function setDisabled() {
 	var len = parent.children.length;
	 	for(var i = 0; i < len; i++) {
			if (disabled) {
				parent.children[i].setAttribute("disabled","true");
			} 
			else {
				parent.children[i].removeAttribute("disabled");
			}
		}
		if(disabled) {
			disabled = false;
		} else {
			disabled = true;
		}
}

//重置数组和颜色
function reset() {
	data = [];
	flag = false;
	len = odiv.length;
	for(var i = 0; i<len ; i++) {
		odiv[i].className ="recover";
	}
}


//渲染
function render(val) { 
	var	i = 0;
		data[i].className = "traverse";
		if(val) {
			search(val,i);
		}
		timer = setInterval(function() {
			i++;		
			if (i < data.length) {
				if(search(val,i-1)) {
					data[i].className = "traverse";
				} else {
				data[i-1].className ="recover";
				data[i].className = "traverse";
				}
				if(val) {
					search(val,i);
				}
			}
		    else {
				clearInterval(timer);
				setDisabled();
				data[i-1].className = "recover";
				if(val && !flag) {
					alert("未找到目标");
				}  else if (val && flag) {
					alert("已找到目标");
				}
			}
		},500);

}

//事件委托
function handler(e) {
	var e = event || window.event;
	switch (e.target.name) {
		case "traverseDF":
			reset();
			setDisabled();
			traverseDF(node);
			render();
			break;
		case "traverseBF":
			reset();
			setDisabled();
			traverseBF(node);
			render();
			break;
		case "searchDF":
			reset();
			if(isSearch()) {
				setDisabled();
				traverseDF(node);
				render(isSearch());
			}
			break;
		case "searchBF":
			reset();
			if(isSearch()) {
				setDisabled();
				traverseBF(node);
				render(isSearch());
			}
			break;
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

//初始化
function init() {
	addEvent($("#outer"),"click", handler); 
}

init();

