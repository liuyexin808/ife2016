(function(_){

function Table(options) {
	var options = options || {};
	//把options复制到组件实例上
	_.extend(this,options);
	this.dataName = Object.keys(this.data);
	this.container = this._createTable();
	this.tbody = this.container.querySelector("tbody");
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
		this.tbody.appendChild(this.tbody.children[0]);
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
		data = "<tr >" + temp + "</tr>";
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
		var self = this;
		this.tbody.addEventListener("click",function(event){
			var e = event.target,
				name = e.parentNode.id;
			if(e.className === "triangle_up") {
				self.sortTable(name,"up");
			} else if(e.className === "triangle_down") {
				self.sortTable(name,"down");
			}
		})
	}
}

//暴露接口
window.Table = Table;

})(util)