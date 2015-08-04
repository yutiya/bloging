##  使用async控制并发

原文链接: https://github.com/alsotang/node-lessons/tree/master/lesson5   
博主已学习,并做记录

### 目标
建立一个lesson5项目,在其中编写代码
代码入口`app.js` , ` $ node app.js`, 会输出[CNode社区](https://cnodejs.org)首页的所有主题的标题、链接和第一条评论,以json格式   
注意: 与lesson4不同. 并发连接数需要控制在5个

输出实例:   

``` text
    [
      {
        "title": "【公告】发招聘帖的同学留意一下这里",
        "href": "http://cnodejs.org/topic/541ed2d05e28155f24676a12",
        "comment1": "呵呵呵呵"
      },
      {
        "title": "发布一款 Sublime Text 下的 JavaScript 语法高亮插件",
        "href": "http://cnodejs.org/topic/54207e2efffeb6de3d61f68f",
        "comment1": "沙发！"
      }
    ]
```

### 知识点

- 学习 [async](https://github.com/caolan/async) 的使用. 这里有个详细的 async demo演示: https://github.com/alsotang/async_demo
- 学习使用 async 来控制并发连接数

当你需要去多个源(一般是小于 10 个)汇总数据的时候，用 eventproxy 方便；当你需要用到队列，需要控制并发数，或者你喜欢函数式编程思维时，使用 async。大部分场景是前者   

开始:   
首先,我们伪造一个 `fetchUrl(url, callback)` 函数,这个函数的作用,就是当你调用它时,它会返回url的页面内容回来.

``` code
    fetchUrl(url, function(err, content){
        // do something with 'content'
    });
```

当然,我们这里的返回内容是假的,返回延时是随机的.并且在它被调用时,会告诉你它现在一共被多少个地方并发的调用着.

``` code
    var connectCurrentCount = 0;
    var fetchUrl = function(url, callback) {
            // delay 的值在2000以内,是个随机的整数
            var delay = parseInt((Math.random() * 10000000) % 2000, 10);
            connectCurrentCount++;
            console.log('现在的并发连接数为->', connectCurrentCount, '  ,正在抓取的url地址为->', url, ' ,耗时' + delay + '毫秒');
            setTimeout(function(){
                connectCurrentCount--;
                callback(null, url + ' html content');
            }, delay);
        };
```

我们继续,来伪造一组链接

``` code 
    var urls = [];
    for(var i = 0; i < 30; i++) {
        urls.push('http://datasource...' + i);
    }
```

有图有真相:   
![](/images/nodejs-lesson5/1.png)

接着,我们使用 `async.mapLimit` 来并发抓取,获取结果.

``` code 
    async.mapLimit(urls, 5, function(url, callback) {
        fetchUrl(url, callback);
    }, function (err, result) {
        console.log('final:');
        console.log(result);
    });
```

完整的代码是这样.

``` code
    var async = require('async');
    var connectCurrentCount = 0;
    var fetchUrl = function(url, callback) {
            // delay 的值在2000以内,是个随机的整数
            var delay = parseInt((Math.random() * 10000000) % 2000, 10);
            connectCurrentCount++;
            console.log('现在的并发连接数为->', connectCurrentCount, '  ,正在抓取的url地址为->', url, ' ,耗时' + delay + '毫秒');
            setTimeout(function(){
                connectCurrentCount--;
                callback(null, url + ' html content');
            }, delay);
        };
    var urls = [];
    for(var i = 0; i < 30; i++) {
        urls.push('http://datasource...' + i);
    }
    async.mapLimit(urls, 5, function(url, callback) {
        fetchUrl(url, callback);
    }, function (err, result) {
        console.log('final:');
        console.log(result);
    });
```

有图有真相:   
![](/images/nodejs-lesson5/2.png)












