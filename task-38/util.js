var util = (function(){
return  {
		$:function(id) {
			return document.querySelector(id);
		},

		$$:function(id) {
			return document.querySelectorAll(id);
		},
		extend:function(o1,o2) {
			for(var i in o2) {
				if(!(i in o1)) {
					o1[i] = o2[i]
				}
			}
			return o1;
		},
		changeNode:function(html) {
			var container = document.createElement("div");
			container.innerHTML = html;
			return container.children[0];
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