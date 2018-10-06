---
title: 基于github的git pages搭建博客
date: 2018-10-05
tags: [博客]
categories: note
description: github gitpages blog
---
## 使用gitpages搭建博客(极速版)

### 前言
网上有很多美观大方的博客，基于git pages的也有很多好看而精美的博客样式。

但这里统统不讲，只讲如何极速拥有一个自己的[美观?]博客

### 建立博客站
1. 准备一个github账号，假设用户名为xxx。

2. 新建一个git仓库，命名为 xxx.github.io 。

3. 进入设置界面，点击选择主题。

![演示图][1]


4. 以为还有四五六七八？教程已经结束。可以直接开始写文章上传啦。

### 注意事项
网站建设到这算是没问题了，如果只有简单的需求这也可以满足。

接下来的内容可以帮助更好的建设自己的网站。

1. 选择的主题的简单自定义信息（更详细的信息请移步[git pages文档][2]）        
```yml
    # _config.yml
    title: title_of_blog
    subtitle: subtitle_of_blog
    description: xxx
    keywords: [blog, 技术, c++, python] 
    author: the_author_name
    language: zh-CN
    timezone:
    url: https://example.com  # 若设置CNAME则设置此项
``` 

2. 修改域名别名（CNAME）      
&emsp;&emsp;
  如果觉得gitpage的默认域名不好，可以买一个自己的域名。现在一般域名都很便宜。我买的一个就首年7元，以后续费35/年。而且这后缀还是 .cn。     
&emsp;&emsp;
  买完域名就设置域名解析，添加一项CNAME的，指向现在的 xxx.github.io。接着再在github的这个网站项目的根目录新建一个文件CNAME，内容就是买的域名，比如 example.com 就行。      
&emsp;&emsp;
  当时我设置的时候遇到了http与https瞎跳转的问题，甚至明明链接指向 https://example.com 结果最后出现的还是http的网址。这个时候可以去设置一下配置文件（_config.yml）就是上文的最后一行。
  设为自己的域名即可。
  最后一项在设置域名别名(CNAME)的时候很重要，
  当时我就是因为不知道，踩了好久的坑。
  设置此项后（指明https）再也没遇到过http与https胡乱的跳转问题了。
  也就可以放心设置只提供https（即 Enforce HTTPS）    


3. 网站自定义    
&emsp;&emsp;
这个有两种方法，要么根据[文档][3]设置。要么用笨办法。    
&emsp;&emsp;
根据文档做就不说了，本文的核心还是极速可用。
那么就说说我自己也在用的笨办法吧。
那就是Javascript。在这个框架下是支持markdown内嵌入js代码的。
所以一般网页能做的它都能做。唯一需要注意的是有的部分的html是晚于markdown的内容的，也就是说可能在js运行的时候，它想要修改的内容都还没出现，所以需要适当的js延时或重试。同样的，通过js引入css也是小菜一碟啦。    
&emsp;&emsp;
不过它的优缺点也很明显。
好处是代码即时可用，也不需要构建工程不需要其他维护。
坏处就是随着自定义的程度的提升，写js的工作量也急剧提升，甚至不如自己直接写html，也就丧失了原本框架的便捷了。       
&emsp;&emsp;    
&emsp;&emsp;    
(tips: F12查看我的js定制。已经实现了自动生成目录，自动设置并更新励志格言功能)



[个人小站][4]




[1]: https://xchens-1254410906.cos.ap-shanghai.myqcloud.com/images/gitpages_choose_theme12345.png
[2]: https://help.github.com/categories/github-pages-basics/
[3]: https://jekyllrb.com/docs/
[4]: https://xchens.cn/



<script type="text/javascript" src="/assets/js/customize.js"></script>
