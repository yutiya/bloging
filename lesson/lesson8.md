## 测试用例:supertest

学习中,[原文链接](https://github.com/alsotang/node-lessons/tree/master/lesson8)

### 目标

建立一个lesson8项目,在其中编写代码     

app.js:其中有个fibonacci接口

fibonacci函数的定义为`int fibonacci(int n)`,调用函数的url路径是`/fib?n=10`,然后这个接口会返回55    
函数的行为定义如下:    

- 当`n === 0`时,返回0;`n === 1`时，返回1
- `n > 1`时,返回`fibonacci(n) === fibonacci(n-1) + fibonacci(n-2)`,如`fibonacci(10) === 55`
- n不可大于10,否则抛错,`http status 500`,因为Node.js的计算性能没那么强。
- n也不可小于0,否则抛错500,因为没意义。
- n不为数字时，抛错,500

test/main.test.js:对app的接口进行测试,覆盖以上所有情况

### 知识点

- 学习[supertest](https://github.com/tj/supertest )的使用
- 复习mocha,should的使用

### 开始

``` bash
    $ npm init # 来吧,一阵阵的键盘声(不停的回车)
```

然后编写安装模块    
` $ npm install xxx --save`和` $ npm install xxx --save-dev`是有差异的噢,修改于配置文件中的地方不同噢

``` config
    "devDependencies": {
        "mocha": "^1.21.4",
        "should": "^4.0.4",
        "supertest": "^0.14.0"
    },
    "dependencies": {
        "express": "^4.9.6"
    }
```

编写代码app.js:

``` code
    var express = require('express');

    var fibonacci = function(n) {
        if (typeof n !== 'number' || isNaN(n)) {
            throw new Error('n should be a Number');
        }
        if (n < 0) {
            throw new Error('n should >= 0');
        }
        if (n > 10) {
            throw new Error('n should <= 10');
        }
        if (n === 0) {
            return 0;
        }
        if (n === 1) {
            return 1;
        }
        return fibonacci(n-1) + fibonacci(n-2);
    };


    var app = express();

    app.get('/fib', function(req, res){
        var n = Number(req.query.n);
        try{
            //如果直接给个数字的话,它会当成你给了一个http状态码,所以我们转换成String
            res.send(String(fibonacci(n)));
        } catch(e) {
            res.status(500)
                .send(e.message);
        }
    });
    // module.exports与exports的区别
    module.exports = app;

    app.listen(3000, function(){
        console.log('app ls listening at port 3000');
    });

```

运行` $ node app.js`

访问`http://localhost:3000/fib?n=10`,看到55就成功了.    
访问`http://localhost:3000/fib?n=111`,会看到`n should <= 10`.    

