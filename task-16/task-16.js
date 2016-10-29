/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
	
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.trim();
	var num = document.getElementById("aqi-value-input").value.trim();
	if (!/^[a-zA-Z\u4e00-\u9fa5]+$/g.test(city)) {
		 alert("输入的城市名必须为中英文字符");
		 return;
	};
	if (!/^\d+$/g.test(num)) {
		 alert("空气质量指数必须为整数");
		 return;	 
	}
	aqiData[city] = num ;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var tab = document.getElementById("aqi-table");
	tr ="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for(var city in aqiData) {
		tr += "<tr><td>" + city + "</td><td>" + aqiData[city] +"</td><td><button>"
			+ "删除" + "</button></td></tr>"; 

	}
	tab.innerHTML = tr;
	
}

	



/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  var city = event.target.parentNode.parentNode.firstChild.innerHTML;
  delete aqiData[city];
  renderAqiList();

}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  document.getElementById("add-btn").onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  document.getElementById("aqi-table").onclick = delBtnHandle;
}
	init();
