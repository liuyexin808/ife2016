
(function(){
	var template = 
	"<div class='modal'>\
			<div class='modal_wrap'>\
				<div class='modal_head'>弹窗</div>\
				<div class='modal_body'>内容</div>\
				<div class='modal_foot'>\
					<div class='confirm'>确定</div>\
					<div class='cancel'>取消</div>\
				</div>\
			</div>\
		</div>"
	function changeNode(html) {
		var container =	document.createElement("div");
		container.innerHTML = html;
		return container.children[0];
	}
	function extend(o1,o2) {
		for(var key in o2) {
			if(typeof o1[key] !== undefined) {
				o1[key] = o2[key];
			}
		}
		return o1;
	}
	function Modal(options) {
		var options = options|| {};
		this.container = this._layout.cloneNode(true);
		this.body = this.container.querySelector(".modal_body");
		this.head = this.container.querySelector(".modal_head");
		this.wrap = this.container.querySelector(".modal_wrap");
		extend(this,options);
		this._initEvent();
	}
	extend(Modal.prototype,{
		_layout: changeNode(template),
		setContent:function(content){
			if(!content) return;
			this.body.innerHTML = content;
		},
		show:function(content){
			if(content) {
				this.setContent(content);
			}
			document.body.appendChild(this.container);
		},
		hide:function(){
			var container = this.container;
			document.body.removeChild(container);
		},
		_onConfirm:function(){
			this.onConfirm();
			this.hide();
		},
		_onCancel:function(){
			this.onCancel();
			this.hide();
		},
		_dragWrap:function(){
			var self = this;
			function moveWrap(event){
				var posX = event.clientX - self.wrap.offsetLeft;
						posY = event.clientY - self.wrap.offsetTop;
					var move = function(event) {
						self.wrap.style.left = event.clientX - posX +"px";
						self.wrap.style.top = event.clientY - posY +"px";
					}
					var remove = function() {
					document.removeEventListener("mousemove",move,false)
					}
				document.addEventListener("mousemove",move,false);
				document.addEventListener("mouseup",remove,false)
			}
			moveWrap(event);
		},
		_initEvent:function() {
			this.container.querySelector(".confirm").addEventListener("click",this._onConfirm.bind(this));
			this.container.querySelector(".cancel").addEventListener("click",this._onCancel.bind(this));
			this.head.addEventListener("mousedown",this._dragWrap.bind(this));
		}
	})
	window.Modal = Modal;
})()


