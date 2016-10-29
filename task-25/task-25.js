var node = $("#node"),	
	data = [];



//深度遍历
function traverseDF(node) {
	var len;
	if(node) {
		len = node.children.length;
		data.push(node);
		for(var i = 1; i < len; i++) {
			traverseDF(node.children[i]);
		}
	}
} 

function controlButton(e) {
	var e = e.target,
		parent = e.parentNode.parentNode,
		len = parent.children.length;
		console.log(len);
	if(e.className == "trangle-right") {
		for(var i =1;i < len; i++) {
			parent.children[i].className = "visible";
		}
		e.className = "trangle-down";
	} 
	else if(e.className == "trangle-down") {
		for(var i = 1;i < len; i++) {
			parent.children[i].className = "hidden";
		}
		e.className = "trangle-right";
	}
}



//添加按钮
function addElement() {
	var val = $("#text").value.trim(),
		focusNode = $(".focus"),
		parent;
		if(!val || !focusNode) {return;}
		parent= focusNode.parentNode;
	parent.innerHTML += "<div><span><a ></a>" + val +"</span></div>";

	judgeContent(parent);
}


function judgeContent(parent) {
	var btn = parent.querySelector("a"),
		len = parent.children.length;
	if(btn.className == "") {
		btn.className ="trangle-right";
	}

	if(btn.className == "trangle-right") {
		for(var i =1;i < len; i++) {
			parent.children[i].className = "hidden";
		}
	} 
	else if(btn.className == "trangle-down") {
		for(var i = 1;i < len; i++) {
			parent.children[i].className = "visible";
		}
	}
}


function searchContent() {
	var val = $("#content").value.trim(),
		parent;
	reset();
	traverseDF(node);
	data = data.filter(function(item) {
		return val == item.firstElementChild.innerText;
	});
	console.log(data)
	for(var i = 0;i < data.length;i++) {
		data[i].firstElementChild.className = "focus";
		while(data[i].className != "visible") {
			data[i].className = "visible";
			data[i] = data[i].parentNode;
		}
	}

	
}

//删除按钮
function removeElement() {
	var focusNode = $(".focus"),
		parent;
		if(!focusNode) {return;}
		parent= focusNode.parentNode;
	parent.parentNode.removeChild(parent);
}


function clickElement(e) {
	reset();
	if(e.target.className == "recover") {
		e.target.className = "focus";
	} else if (e.target.className == "focus") {
		e.target.className = "recover";
	}
}


function reset() {
	var len = $$("span").length;
		data =[];
	for(var i = 0; i<len ; i++) {
		$$("span")[i].className ="recover";
	}
}


function init() {
	addEvent($("#node"),"click",clickElement);
	addEvent($("#node"),"click",controlButton);
	addEvent($("#add"),"click",addElement);
	addEvent($("#remove"),"click",removeElement);
	addEvent($("#search"),"click",searchContent);
	
}
init();








