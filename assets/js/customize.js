/**
 * 提供自定义设置
 * 1. 根据dom自动生成目录并显示在右侧目录(手机端显示在底部，没办法)
 * 2. 自动更换格言（随机）
 */

// 1. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// 找到下一个h标签
function next_h(node){
    var n = node.nextElementSibling;
    while(n !== null){
        if(n.nodeName.length === 2 && n.nodeName.toLowerCase()[0] === "h"){
            break;
        }
        else{
            n = n.nextElementSibling;
        }
    }
    return n;  // null或<h?>
}
function get_indentattion(n){
    indentation = "----";
    r = "";
    for (var i=0;i<n-1;i++){ 
        r += indentation;
    }
    return "<br>" + r + ">";
}

// 扫描目录输出目录信息
function output_TOC(t){
    // 参数t为第一个h标签
    var html = "";  //待会的sidebar内容

    var line = get_indentattion(Number(t.nodeName[1])) + "<a href=\"#" + t.id +"\">" + t.textContent + "</a><br>\n";
    html += line;
    t = next_h(t);
    while(t!== null){
        line = get_indentattion(Number(t.nodeName[1])) + "<a href=\"#" + t.id +"\">" + t.textContent + "</a><br>\n";
        html += line;
        t = next_h(t);
    }
    return html;
}

// 将已知的目录信息进行提取，设置到右侧导航栏
function set_TOC(m){
    // 参数m为内容区域
    // 侧边栏
    t = m.firstElementChild; // 内容区域的第一个元素节点（一般是h标签）
    html = output_TOC(t);
    
    var sdbar = document.getElementById("sidebar");  // 侧边栏
    if(sdbar === null){
        setTimeout(() => {
            set_TOC(m); // 递归调用自我
        }, 1000);
    }
    else{
        sdbar.innerHTML = html;
    }
}


// 2. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

//生成从minNum到maxNum的随机整数
function randomNum(minNum,maxNum){ 
    // Math.random()  // [0,1)
    switch(arguments.length){ 
        case 1: 
            return Math.floor(Math.random()*minNum); // [0, n)
            break; 
        case 2: 
            return Math.floor(Math.random()*(maxNum-minNum)+minNum); // [n, m)
            break; 
        default: 
            return 0; 
            break; 
    }
}

function modify_motto(motto){
    // 定位到格言位置
    var header = document.getElementsByTagName('header')[0];
    var my_motto = header.firstElementChild.firstElementChild.nextElementSibling;
    // 修改
    my_motto.innerText = motto;
}

function set_motto(mottoes){
    //周期性更新motto
    var n = randomNum(mottoes.motto.length)
    var motto = mottoes.motto[n];  // get随机的motto
    modify_motto(motto); // 修改
}

function get_mottoes(){
    //1.创建AJAX对象
    var ajax = new XMLHttpRequest();
    //4.给AJAX设置事件(这里最多感知4[1-4]个状态)
    ajax.onreadystatechange = function(){
        //5.获取响应
        //responseText以字符串的形式接收服务器返回的信息
        //console.log(ajax.readyState);
        if(ajax.readyState == 4 && ajax.status == 200){
            let msg = ajax.responseText;
            let mottoes = JSON.parse(msg);  //数据转化为json对象
            
            //周期性更新
            set_motto(mottoes); // 避免老是以同一个motto作为开始
            setInterval(()=>{set_motto(mottoes)}, 11000);
        }
    }
    //2.创建http请求,并设置请求地址

    ajax.open('get', '/assets/data/motto.json');
    //3.发送请求(get--null    post--数据)
    ajax.send(null);
}

function update_motto(){
    //最后封装版
    get_mottoes();
}
// 3. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

function jump2https(){
    var targetProtocol = "https:";
    if (window.location.protocol != targetProtocol) 
        window.location.href = targetProtocol +
        window.location.href.substring(window.location.protocol.length);
}

// 3. ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
function import_livere_comments(d, s){
    var j, e = d.getElementsByTagName(s)[0];

    if (typeof LivereTower === 'function') { return; }

    j = d.createElement(s);
    j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
    j.async = true;

    e.parentNode.insertBefore(j, e);
}
var comments = 
"<div id=\"lv-container\" data-id=\"city\" data-uid=\"MTAyMC80MDE4My8xNjcxMA==\">\n  \
 \
<noscript>为正常使用评论功能请激活JavaScript</noscript>\n  \
</div>";

function dom_insert_comment(mcontent){
    // 插入到主体内容片段下方
    var mycomments = document.createElement('div');
    mycomments.innerHTML = comments;
    mcontent.appendChild(mycomments);
    import_livere_comments(document, 'script'); 
    console.log(mycomments);
}

//----------------main----------------------↓↓↓↓↓↓↓

var mcontent = document.getElementById("main-content");  // content area

set_TOC(mcontent); // 设置右侧目录

update_motto();  // 更新格言

jump2https();//js 自动从http跳转到https（必须先加载http，所以不能禁用http）

dom_insert_comment(mcontent); // 插入评论模块


