// 自动扫描文档，生成目录信息，显示在右侧栏

// 内容提取
var mcontent = document.getElementById("main-content");  // content area
var h1 = mcontent.getElementsByTagName("h1");
var h2 = mcontent.getElementsByTagName("h2");
var h3 = mcontent.getElementsByTagName("h3");
var h4 = mcontent.getElementsByTagName("h4");
var h5 = mcontent.getElementsByTagName("h5");


// 侧边栏修改
var sidebar = document.getElementById("sidebar");
sidebar.innerHTML = " ";  // clear sidebar

console.log(h1);
console.log(h2);
console.log(h3);
console.log(sidebar);

