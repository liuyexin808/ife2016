var path = [];

var openList = (function() {
	var olist = [],G,H,F;
	return {
		getLength:function() {
			return olist.length;
		},
		add:function(point) {
			olist.push(point);
		},
		remove:function(){
			olist.shift();
		},
		findMin:function() {
			olist.sort(function(a,b){
				return a.F - b.F;
			});
			return olist[0];
		},
		isInlist:function(point) {
			return olist.some(function(item){
				return item.x === point.x && item.y === point.y
			})
		},
		inPoint:function(currentPoint,point){
			if(point.x === currentPoint.x || point.y === currentPoint.y) {
				G = 10;
			} else {
				G = 14;
			}
			if(point.G > currentPoint.G + G) {
				point.G = currentPoint.G + G;
				point.F = point.H + point.G;
				point.parent = currentPoint;
			}

		},
		noInPoint:function(currentPoint,point,end){
			if(closeList.isInList(point)) {
				return false;
			} 
			if(map.isOver(point.x,point.y)){
				return false;
			}
			if(map.isWall(point.x,point.y)) {
				return false;
			}

			if(point.x === currentPoint.x || point.y === currentPoint.y) {
				G = 10;
			} else {
				G = 14;
			}
			if(G == 14) {
				if(map.isWall(point.x+1,point.y) && map.isWall(point.x,point.y-1) || map.isWall(point.x,point.y+1)) {
				return false;
				} 
				if(map.isWall(point.x-1,point.y) && map.isWall(point.x,point.y-1) || map.isWall(point.x,point.y+1)) {
				return false;
				}
			}
			point.G = G;
			point.H = Math.abs(point.x - end.x)*10 + Math.abs(point.y - end.y)*10;
			point.F = point.G + point.H;
			point.parent = currentPoint;
			olist.push(point);
		},
		foundPoint:function(end) {
			return olist.some(function(item){
				return item.x == end.x && item.y == end.y
			})
		},
		getEnd:function(end) {
			olist.forEach(function(item){
				if(item.x == end.x && item.y == end.y) {
					 end.parent = item.parent;
				}
			})
		},
		init:function() {
			olist = [];
		}
	}
})();


var closeList = (function() {
	var colist = [];
	return {
		add:function(point){
			colist.push(point);
		},
		isInList:function(point) {
			return colist.some(function(item){
				return item.x == point.x && item.y == point.y
			})
		},
		getPath:function(end) {
			if(end.parent) {
				path.unshift(end.parent);
				this.getPath(end.parent);
			}
		},
		init:function(){
			colist = [];
		}
	}
})();

function findPath(start,end) {
	var currentPoint;
	init();
	openList.add(start);
	while (!openList.foundPoint(end)) {
		currentPoint =  openList.findMin();
		openList.remove();
		closeList.add(currentPoint);
		getPoint(currentPoint).forEach(function(item){
			if(openList.isInlist(item)){
				openList.inPoint(currentPoint,item);
			} else {
				openList.noInPoint(currentPoint,item,end);
			}
		});
		console.log(currentPoint);
		if(!openList.getLength()) {
			alert("无法到达目标点");
			break;
		}
	}
	openList.getEnd(end)
	closeList.getPath(end);
	path.push(end);
}

function getPoint(currentPoint) {
	var cx = currentPoint.x,
		cy = currentPoint.y,
		arr = [
	{x:cx+1,y:cy+1},
	{x:cx+1,y:cy},
	{x:cx+1,y:cy-1},
	{x:cx,y:cy+1},
	{x:cx,y:cy-1},
	{x:cx-1,y:cy+1},
	{x:cx-1,y:cy},
	{x:cx-1,y:cy-1}
	];
	return arr;
}


function init() {
	closeList.init();
	openList.init();
	path = [];
}


var data = [];
function getPathOrder(){
	var x,y;
	for(var i = path.length -1;i > 0; i--) {
		x = path[i].x - path[i-1].x;
		y = path[i].y - path[i-1].y;
		data.unshift([x,y]);
	}
}

function moveToAnimation() {
	var order = data.shift();
	if(order === undefined) {
		return 
	}
	if(!isStraight(order)) {
		order = changeStraight(order);
	}
	order = changeMoveOrder(order);
	command.second = order;
	command.third = 1;
	command.movWay();
	setTimeout(moveToAnimation,500);
}

function isStraight(order) {
	if(order[0] != 0 && order[1] != 0) {
		return false;
	}
	return true;
}

function changeStraight(order) {
	var order_1 = [order[0],0],
		order_2 = [0,order[1]];
	if(map.isWall(block.x+order_1[0],block.y+order_1[1])) {
		order = order_2;
		data.unshift(order_1);
	} else {
		order = order_1;
		data.unshift(order_2);
	}
	return order;
}

function changeMoveOrder(order) {
	switch(order.join(",")){
		case "0,1": order = "BOT";break;
		case "0,-1": order = "TOP";break;
		case "1,0" : order = "RIG";break;
		case "-1,0": order = "LEF";break;
	}	
		console.log(order);
		return order
}
 a={
 	x:7,
 	y:7
 }
 b= {
 	x:1,
 	y:1
 }

