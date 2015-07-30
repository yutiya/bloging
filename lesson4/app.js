var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio    = require('cheerio');
//加载标准库模块url
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
	.end(function(err, res){
		if (err) {
			return console.error(err);
		};
		var $ = cheerio.load(res.text);
		var topicUrls = [];
		//获取链接
		$('#topic_list .topic_title').each(function(idx, element){
			var $element = $(element);
			var href = url.resolve(cnodeUrl, $element.attr('href'));
			topicUrls.push(href);
		});
		// console.log(topicUrls);
		// 创建对象实例
		var ep = new eventproxy();
		//监听topicUrls.length次'topic_html'再行动
		ep.after('topic_html', topicUrls.length, function(topics){
			//topic是个数组,包含了40次ep.emit('topic_html', pair)中的那40个pair
			topics = topics.map(function(topicPair){
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				var $ = cheerio.load(topicHtml);
				return ({
					title: $('.topic_full_title').text().trim(),
					href: topicUrl,
					comment: $('.reply_content').eq(0).text().trim()
				});
			});
			console.log('final:');
			console.log(topics);
		});
		topicUrls.forEach(function(topicUrl){
			superagent.get(topicUrl)
				.end(function(err, sres){
					console.log('fetch: ' + topicUrl + ' successful');
					ep.emit('topic_html', [topicUrl, sres.text]);
				});
		});
	});



