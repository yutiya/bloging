#!/bin/sh
echo '克隆'
git clone git@github.com:yutiya/blog.git
echo '进行目录,开始工作'
cd blog
echo '安装模块'
npm install
echo '清理目录'
hexo clean 
echo '生成'
hexo g
echo '拷贝50x'
cp resources/50x.html public
echo '拷贝40x'
cp resources/404.html public
echo '拷贝ico'
cp resources/favicon.ico public
echo '拷贝images'
cp -r resources/images public/images
echo '发布'
hexo d