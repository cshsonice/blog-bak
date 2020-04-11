/**
 * 提供自定义设置
 * 1. 根据dom自动生成目录并显示在右侧目录(手机端显示在底部，没办法)
 * 2. 自动更换格言（随机）
 * 3. http跳转到https
 */

// 1. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// 找到下一个h标签
function next_h(node) {
    var n = node.nextElementSibling;
    while (n !== null) {
        if (n.nodeName.length === 2 && n.nodeName.toLowerCase()[0] === "h") {
            break;
        }
        else {
            n = n.nextElementSibling;
        }
    }
    return n;  // null或<h?>
}
function get_indentattion(n) {
    indentation = "----";
    r = "";
    for (var i = 0; i < n - 1; i++) {
        r += indentation;
    }
    return "<br>" + r + ">";
}

// 扫描目录输出目录信息
function output_TOC(t) {
    // 参数t为第一个h标签
    var html = "";  //待会的sidebar内容

    var line = get_indentattion(Number(t.nodeName[1])) + "<a href=\"#" + t.id + "\">" + t.textContent + "</a><br>\n";
    html += line;
    t = next_h(t);
    while (t !== null) {
        line = get_indentattion(Number(t.nodeName[1])) + "<a href=\"#" + t.id + "\">" + t.textContent + "</a><br>\n";
        html += line;
        t = next_h(t);
    }
    return html;
}

// 将已知的目录信息进行提取，设置到右侧导航栏
function set_TOC(m) {
    // 参数m为内容区域
    // 侧边栏
    t = m.firstElementChild; // 内容区域的第一个元素节点（一般是h标签）

    html = output_TOC(t);

    var sdbar = document.getElementById("sidebar");  // 侧边栏
    if (sdbar === null) {
        setTimeout(function(){
            set_TOC(m); // 递归调用自我
        }, 1000);
    }
    else {
        sdbar.innerHTML = html;
    }
}


// 2. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//生成从minNum到maxNum的随机整数
function randomNum(minNum, maxNum) {
    // Math.random()  // [0,1)
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * minNum); // [0, n)
            break;
        case 2:
            return Math.floor(Math.random() * (maxNum - minNum) + minNum); // [n, m)
            break;
        default:
            return 0;
            break;
    }
}

function modify_motto(motto) {
    // 定位到格言位置
    var header = document.getElementsByTagName('header')[0];
    var my_motto = header.firstElementChild.firstElementChild.nextElementSibling;
    // 修改
    my_motto.innerText = motto;
}

function set_motto(mottoes) {
    //周期性更新motto
    var n = randomNum(mottoes.motto.length)
    var motto = mottoes.motto[n];  // get随机的motto
    modify_motto(motto); // 修改
}

function get_mottoes() {
    //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    //4.给AJAX设置事件(这里最多感知4[1-4]个状态)
    ajax.onreadystatechange = function () {
        //5.获取响应
        //responseText以字符串的形式接收服务器返回的信息
        //console.log(ajax.readyState);
        if (ajax.readyState == 4 && ajax.status == 200) {
            let msg = ajax.responseText;
            let mottoes = JSON.parse(msg);  //数据转化为json对象

            //周期性更新
            set_motto(mottoes); // 避免老是以同一个motto作为开始
            setInterval(function(){ set_motto(mottoes) }, 11000);
        }
    }
    //2.创建http请求,并设置请求地址

    ajax.open('get', '/assets/data/motto.json');
    //3.发送请求(get--null    post--数据)
    ajax.send(null);
}

function update_motto() {
    //最后封装版
    get_mottoes();
}
// 3. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

function jump2https() {
    var targetProtocol = "https:";
    if (window.location.protocol != targetProtocol)
        window.location.href = targetProtocol +
            window.location.href.substring(window.location.protocol.length);
}

// 4. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//当页面滚动到顶部后固定住侧边栏
function fix_sidebar() {
    var oDiv = document.getElementById("sidebar");
    let offHeight = 0;
    let offLeft = 0;
    let Y = oDiv;
    while (Y) {
        offHeight += Y.offsetTop;
        offLeft += Y.offsetLeft;
        Y = Y.offsetParent;
    }
    let rawWidth = window.innerWidth;   // 可用窗口宽度
    let rawHeight = window.innerHeight; // 可用窗口高度
    window.onscroll = function () {
        var s = document.body.scrollTop || document.documentElement.scrollTop;
        if (s > offHeight && rawWidth == window.innerWidth) {
            // 当前div滚动到顶部 && 窗口大小未改变
            oDiv.style = `position:fixed; left:${offLeft}px; top:0;overflow:auto;max-height:${rawHeight*0.8}px`;
        } else {
            oDiv.style = "";
        }
    }
}

// 5. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// 切换深色或浅色主题
function cs_toggleTheme(e){
    let checkbox = document.getElementById("toggleThemeCheckbox");
    if(checkbox.checked){
        // 开启深色主题
        DarkReader.enable({
            brightness: 100, // 明亮度
            contrast: 109,   // 对比度
            sepia: 10        // 棕褐色
        });  // 深色模式
    }
    else{
        DarkReader.disable();
    }
}

//----------------main----------------------↓↓↓↓↓↓↓

jump2https();//js 自动从http跳转到https（必须先加载http，所以不能禁用http）

window.onload = function () {
    update_motto();  // 更新格言
    

    var mcontent = document.getElementById("main-content");  // content area
    if (mcontent.firstElementChild.innerText.toLowerCase() == "index") {
        return; // 检测到当前页为索引页，不生成目录
    }
    set_TOC(mcontent); // 设置右侧目录
    fix_sidebar(); // 固定目录块
}

