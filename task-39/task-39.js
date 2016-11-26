(function(_){



function Table(options) {
	var options = options || {};
	//把options复制到组件实例上
	_.extend(this,options);
	this.dataName = Object.keys(this.data);
	this.container = this._createTable();
	this.tbody = this.container.querySelector("tbody");
	this.thead = this.container.querySelector("thead");
	this._init();
}

Table.prototype = {
	//根据标题名作为排列目标,方式为从小到大或者从大到小
	sortTable:function(titleName,way) {
		var titleName = titleName || "total";
		var self = this;
		var arr = [];
		this.dataName.forEach(function(item){
			arr.push([item,self.data[item][titleName]])
		});
		arr.sort(function(a,b){
			return way === "up" ? b[1]-a[1] : a[1]-b[1];
		})
		this.dataName = arr.map(function(item){
			return item[0];
		})
		this._render();
	},
	//排序后渲染表格
	_render:function() {
		var self =this;
		this.dataName.forEach(function(item){
			self.tbody.appendChild(_.$("#"+item));
		})
	},
	//创建表格
	_createTable:function() {
		var temp = "",data = "",arr,self = this;
		this.title.forEach(function(item){
			if(item.isSort) {
				temp += "<th id = "+item.name +">" + item.label +"<div class='triangle_up'></div><div class='triangle_down'></div></th>"
			} else {
				temp += "<th id = "+item.name +">" + item.label +"</th>"
			}
		});	
		data = "<thead><tr >" + temp + "</tr></thead>";
		temp = "";
		this.dataName.forEach(function(item){
			arr = Object.keys(self.data[item]);
			arr.forEach(function(i){
				temp += "<td>"+ self.data[item][i] +"</td>"
			})
			data +="<tr id = "+ item +">" + temp +"</tr>";
			temp ="";
		});

		data = "<table id=" + this.id +">" + data + "</table>";
		var node = _.changeNode(data);
		_.$(this.site).appendChild(node);
		return node;
	},
	//初始化
	_init:function() {
		this.thead.addEventListener("click",this._clickHandler.bind(this));
		document.addEventListener("scroll",this._scrollHandler.bind(this));
	},
	//点击事件
	_clickHandler:function(event) {
		var e = event.target,
			name = e.parentNode.id;
		if(e.className === "triangle_up") {
			this.sortTable(name,"up");
		} else if(e.className === "triangle_down") {
			this.sortTable(name,"down");
		}
	},
	//滚动事件
	_scrollHandler:function(event) {
		var sTop = document.body.scrollTop,
			oTop = _.getTop(this.container),
			oHeight = this.thead.clientHeight +this.tbody.clientHeight;
		if( oTop < sTop  && oTop+oHeight > sTop) {
			_.addClass(this.thead,"fixed")
		} else {
			_.removeClass(this.thead,"fixed");
		}
	}
}

//暴露接口
window.Table = Table;

})(util)