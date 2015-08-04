//  加载模块
var async = require('async');
var superagent = require('superagent');
var cheerio = require('cheerio');
//  主站链接
var cnodeUrl = 'https://cnodejs.org/';
//  当前连接数
var connectCurrentCount = 0;
//  当前处理方法
var getCommont = function(url, callback) {
    connectCurrentCount++;
    superagent.get(url)
        .end(function (err, sres) {
            if(err) {
                getCommont(url, callback);
                return;
            }
            connectCurrentCount--;
            console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url);
            var $ = cheerio.load(sres);
            callback(null, {
                title: $('.topic_full_title').text.trim(),
                href: url,
                comment: $('.reply_content').text.trim()
            });
        });
};

superagent.get(cnodeUrl)
    .end(function(err, res) {
        if(err) {
            console.log(err);
            return;
        }
        var $ = cheerio.load(res);
        var urls = [];
        $('#topic_list .top_title').each(function(idx, element){
            var $element = $(element);
            urls.push(url.resolve(cnodeUrl, $element.attr('href')));
        });
        //  开启并发访问
        async.mapLimit(urls, 5, function(url, callback){
            getCommont(url, callback);
        }, function(err, result){
            console.log('final->');
            console.log(result);
        });
    });