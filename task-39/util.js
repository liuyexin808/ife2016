var util = (function(){
return  {
		//获取单个元素
		$:function(ele) {
			return document.querySelector(ele);
		},
		//获取多个元素
		$$:function(ele) {
			return document.querySelectorAll(ele);
		},
		//扩展对象
		extend:function(o1,o2) {
			for(var i in o2) {
				if(!(i in o1)) {
					o1[i] = o2[i]
				}
			}
			return o1;
		},
		//把html转换为Dom
		changeNode:function(html) {
			var container = document.createElement("div");
			container.innerHTML = html;
			return container.children[0];
		},
		//获取元素对于网页的绝对高度
		 getTop:function(ele) {
			var oTop = ele.offsetTop;
				current = ele.offsetParent;
			while(current != null) {
				oTop += current.offsetParent;
				current = current.offsetParent;
			};

			return oTop;
		},
		//添加类名
		addClass: function (node, className){
      		var current = node.className || "";
      		if ((" " + current + " ").indexOf(" " + className + " ") === -1) {
       		 node.className = current? ( current + " " + className ) : className;
      		}
    	},
    	//移除类名
    	removeClass: function (node, className){
      		var current = node.className || "";
     		node.className = (" " + current + " ").replace(" " + className + " ", " ").trim();
    	},
		addEvent:function(ele, event, hanlder) {
		    if (ele.addEventListener) {
		        ele.addEventListener(event, hanlder, false);
		    } else if (ele.attachEvent) {
		        ele.attachEvent('on' + event, hanlder);
		    } else {
		        ele['on' + event] = hanlder;
		    }
		}
	}
})()