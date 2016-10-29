var tag = [],
    hobby =[];

function $(id) {
    return document.getElementById(id);
}
    
//渲染    
function render(arr,container) {
    var str = "";
    for (var i = 0,len = arr.length; i < len; i++) {
            str = str + "<div class='block'" +"id ='"+ i + "'>" + arr[i] + "</div>";
        }
    container.innerHTML = str;  
}

//把字符串转化为以符号为间隔的数组
function getText() {
    var val = $("textArea").value.trim(),
        content = val.split(/[^0-9A-Za-z\u4E00-\u9FA5]+/g),
        repeat;
    for(var i = 0,len =content.length; i <len; i++) {
        if(content[i] == "") {
            content.splice(i,1);
        }
    }
    return content;
}

//添加进hobby数组
function addHobby() {
    var content = getText(),
        len = content.length,
        repeat;
    for(var i = 0; i < len; i++) {
        if(content) {
            repeat = clearRepeat(content[i],hobby);
            if(!repeat) {
                hobby.push(content[i]);
                isOverTen(hobby);
                render(hobby,$("container_2"));
                clearValue($("textArea"));
            }
            else {
                clearValue($("textArea"));
            }
        } 
    }
}

//添加进tag数组
function tagInput(e) {
    var val  = $("content").value,
        repeat,
        content;
    if (/[,，\s]/.test(val)) {
        content = val.slice(0,-1).trim();
    }
    if (e.keyCode === 13) {
        content = val.trim();
    }
    if(content) {
        repeat = clearRepeat(content,tag);
        if(!repeat) { 
            tag.push(content);
            isOverTen(tag);
            render(tag,$("container_1"));
            clearValue($("content"));
        } else {
            clearValue($("content"));
        }
    }
} 

//清除内容
function clearValue(id) {
    id.value="";
}

//判断是否重复
function clearRepeat(content,arr) {
     var len = arr.length;
     for(var i = 0; i < len; i++) {
        if (content === arr[i]) {
            return true
        } 
     }
     return false;
}
//判断是否超过10个
function isOverTen(arr) {
    if(arr.length > 10) {
        arr.splice(0,1);
    }
    return arr;
}

//鼠标点击删除tag
function deleteTag(e) {
    var index = e.target.getAttribute("id");
    if(e.target === e.currentTarget) {
        return;
    }
    tag.splice(index,1);
    render(tag,$("container_1"));
}

//鼠标进入增加点击删除
function overTag(e) {
    var str = e.target;
    if(e.target === e.currentTarget) {
        return;
    }
    str.className += " block_over";
    str.innerHTML = "点击删除" + str.innerHTML;
}

//鼠标移出恢复原样
function outTag(e) {
    var str = e.target
    if(e.target === e.currentTarget) {
        return;
    }
    e.target.className = "block";
    str.innerHTML = str.innerHTML.replace("点击删除","");
}

//事件绑定
function init() {
    $("content").addEventListener("keyup",tagInput);
    $("container_1").addEventListener("mouseover",overTag);
    $("container_1").addEventListener("mouseout",outTag);
    $("container_1").addEventListener("click",deleteTag);
    $("btn").addEventListener("click",addHobby);
}

init();