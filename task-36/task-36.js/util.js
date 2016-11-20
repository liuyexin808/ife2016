function $(id) {
	return document.querySelector(id);
}

function $$(id) {
	return document.querySelectorAll(id);
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