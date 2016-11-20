
function Map(row,col) {
	this.row = row;
	this.col = col;
	this.wall = null;
}
//创建地图
Map.prototype.createMap= function() {
	var map = $("table"),
		row_str = "",
		col_str = "";
	for(var i = 0; i < this.row; i++) {
		row_str += "<td></td>"			
	}
	for(var j = 0; j < this.col; j++) {
		col_str += "<tr>" + row_str + "</tr>"
	}
	map.innerHTML = col_str;
};
//获取墙Dom
Map.prototype.getWall = function(x,y){
	if((x <= this.row && x >= 1) && (y <= this.col && y >= 1)) {
		this.wall = $$("tr")[y-1].querySelectorAll("td")[x-1];
	} else {
		 this.wall = null;
	}
	return this.wall;
}
//渲染墙
Map.prototype.renderWall = function() {
	this.wall.className = "wall";
}
//判断坐标是否有墙
Map.prototype.isWall = function(x,y) {
	if(this.isOver(x,y)) {
		return false;
	}
	return this.getWall(x,y).className === "wall";
}
//判断坐标是否超过地图边界
Map.prototype.isOver = function(x,y) {
	return x > this.row || x < 1 || y > this.col|| y < 1
}
//随机10个墙
Map.prototype.randomWall = function() {
	var total = $$("td"),time = 10;
	while(time > 0) {
	len = Math.floor(Math.random()*total.length);
	this.wall = total[len];
	this.renderWall();
	time--;
	}
}

var map = new Map(15,15);
map.createMap();
map.randomWall();
map.randomWall();
map.randomWall();