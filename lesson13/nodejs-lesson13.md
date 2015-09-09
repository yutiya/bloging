## 持续集成平台:travis    

### 知识点    

- 学习使用travis-ci对项目进行持续集成测试(https://travis-ci.org/)

### 课程内容     

首先来瞅瞅这个项目: https://github.com/Ricardo-Li/node-practice-3    
我们是学习噢,不是抄袭别人的噢,好记性不如烂笔头嘛    

![](/images/nodejs/lesson13/1.png)

类似这样的badges(徽章),在很多开源项目中都可以看到.前者是告诉我们,该项目目前测试是通过的;后者是告诉我们,这个测试的行覆盖率是多少.行覆盖率当然是越多越好,很重要.    
使用travis平台,因为它可以让你明白自己的项目在一个"空白环境"中,是否能够正确运行;也可以测试项目在不同的Node.js版本下运行,有没有兼容行问题.    
当在自己的机器上开发测试的时候,一般使用特定的Node.js版本,测试过了,需要手动切换版本再测试,相对比较繁琐.所以选择travis帮你把项目在不同的Node.js版本下运行.也可以在我们安装依赖,忘记写入package.json的时候,及时发现.    

travis的虚拟机技术玩得很6,每次测试都是新的环境,环境中只有Linux最基本的依赖.`build-essential`、`wget`、`git`等.`Node.js`运行时都是即时安装的.    

travis默认的依赖对于每个用户都一样,所以你要你在上边测试通过,你就不用担心别的用户安装不上了    
不过呵呵,网站打不开了,暂停该文    

原文地址: https://github.com/alsotang/node-lessons/tree/master/lesson13




