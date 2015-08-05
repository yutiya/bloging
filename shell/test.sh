#!/bin/bash

git clone git@github.com:yutiya/blog.git

cd blog

npm install

hexo clean

hexo g

hexo s