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
		//一级,得到所有主题
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
		//监听topicUrls.length次'topic_html'再执行
		ep.after('topic_html', topicUrls.length, function(topics){
			//topic是个数组,包含了40次ep.emit('topic_html', pair)中的那40个pair
			// array.map方法会遍历数组并且每遍历一次执行一次callback
			//	callback执行后的返回值组合起来又形成一个新的数组
			/*
			topics = topics.map(function(topicPair){
				var topicUrl = topicPair[0];
				var topicHtml = topicPair[1];
				console.log(topicHtml);
				var $ = cheerio.load(topicHtml);
				return ({
					title: $('.topic_full_title').text().trim(),
					href: topicUrl,
					comment: $('.reply_content').eq(0).text().trim()
				});
			});
			console.log('final:');
			console.log(topics);
			*/

			// ep.after('user', topics.length, function(users){
			// 	console.log('');
			// });

			
			topics.forEach(function(topic){
				var topicUrl = topic[0];
				var topicHtml = topic[1];
				var $ = cheerio.load(topicHtml);
				var $userInfo = $('.user_card .user_name a');
				// console.log([
				// 			$('.topic_full_title').text().trim(),
				// 			topicUrl,
				// 			$('.reply_content').eq(0).text().trim(),
				// 			$userInfo.val()
				// 			]);
				
				console.log($userInfo.attr('href'));

				// superagent.get(url.resolve(cnodeUrl, $userInfo.attr('href')))
				// 	.end(function(err, ssres){
				// 		ep.emit('user', [
				// 			$('.topic_full_title').text().trim(),
				// 			topicUrl,
				// 			$('.reply_content').eq(0).text().trim(),
				// 			$userInfo.val()
				// 			])
				// 	});
			});
		});
		topicUrls.forEach(function(topicUrl){
			superagent.get(topicUrl)
				.end(function(err, sres){
					console.log('fetch: ' + topicUrl + ' successful');
					console.log('error:' + err);
					ep.emit('topic_html', [topicUrl, sres.text]);
				});
		});
	});



