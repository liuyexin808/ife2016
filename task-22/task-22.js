var node = document.getElementById("node"),	
	parent = document.getElementById("outer"),
	btn  = document.getElementsByTagName("button"),
	odiv = document.getElementsByTagName("div"),
	data = [],
	flag = false;

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

//渲染颜色
function render() {
	var index = 0;
		data[index].style.backgroundColor ="blue";
		timer = setInterval(function() {
			index++;
			if (index < data.length) {
				data[index-1].style.backgroundColor = "white";
				data[index].style.backgroundColor ="blue";
			}
		    else {
				clearInterval(timer);
				data[index-1].style.backgroundColor = "white";
				flag = true;
				noClick();
			}
		},500);

}

//前序遍历
function preOrder(node) {
	if(node) {
		data.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
}

//中序遍历
function inOrder(node) {
	if(node) {
		inOrder(node.firstElementChild);
		data.push(node);
		inOrder(node.lastElementChild);
	}
}

//后序遍历
function postOrder(node) {
	if(node) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		data.push(node);
	}
}

//禁止点击
function noClick() {
 var len = btn.length;
	 for(var i = 0; i < len; i++) {
		if (flag === false) {
			btn[i].setAttribute("disabled","true");
		} 
		else {
			btn[i].removeAttribute("disabled");
		}
	}
	flag = false;
}

//重置数组和颜色
function reset() {
	data = [],
	len = odiv.length;
	for(var i = 0; i<len - 1; i++) {
		odiv[i].style.backgroundColor = "white";
	}
}
//事件委托
function handler(e) {
	e = event || window.event;
	noClick();
	reset();
	switch (e.target) {
		case btn[0]:
			preOrder(node);
			render();
			break;
		case btn[1]:
			inOrder(node);
			render();
			break;
		case btn[2]:
			postOrder(node);
			render();
			break;
	}
}
//初始化
function init() {
	addEvent(parent,"click",handler);
}

init();