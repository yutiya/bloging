


var stylus = require("stylus"),
				str = require("fs").readFileSync("public/stylus/1.styl", "utf8");

stylus.render(str, function(err, css){
	if (err) { throw err;}
	console.log(css);
});

