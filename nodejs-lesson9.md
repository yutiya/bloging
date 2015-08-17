title: Nodejs第九课
date: 2015-08-17 09:45:52
categories:
- nodejs
- lesson
tags: lesson
---

## 正则表达式    

### 目标

``` code
    var web_development = "python php ruby javascript jsonp perhapsphpisoutdated";
```

找出其中包含p但不包含ph的所有单词,即    
`[ 'python', 'javascript', 'jsonp']`

### 知识点

- 正则表达式的使用
- js中正则表达式与[pcre](http://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions)的区别

### 课程内容

开始这门课之前,先学习   
[正则表达式30分钟入门教程](http://deerchao.net/tutorials/regex/regex.htm)
然后继续学习零宽断言    
[正则表达式之:零宽断言不『消费』](http://fxck.it/post/50558232873) 

很久以前,处理字符串领域的王者当属perl.    
后来出现一个标准叫pcre.     
不过前两个都不算标准,后来出现了正则表达式.js里的正则表达式与pcre不兼容.    
测试自己写的正则表达式可以访问http://refiddle.com/,所见即所得地调试    

讲述js中正则表达式






