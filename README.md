
# 利用Gulp 配置的前端项目自动化工作流
====

> ReadMe 待进一步更新

## 目前的功能

> 详细功能说明待进一步更新

compass

sass

plumber

livereload+tiny-lr

webserve

自动压缩js

自动合并js

图片压缩

自动打包并按时间重命名


## 欲添加的功能

CSS 文件压缩？

## 使用方法

1.  请先确保已经安装Gulp(需要 Node.js 环境) 

		$ npm install --global gulp 

2. 进入你的项目文件夹下`clone` 本 git 项目

		$ git clone https://github.com/Jeff2Ma/Gulp-Project.git
		
3. 按照个人的项目需求，重命名`gulp-project` 文件夹为你自己的项目名称，填写`Project.md `文件，填写`package.json` 文件。如果需要进一步的个性化，可以编辑`gulpfile.js` 文件。
		
4. 然后捏，就基本上可以的了，默认任务：

		$ gulp
	
5. 如果项目已经完成，可以通过`build` 命令进行项目相关文件收集，项目文件最终会汇集到项目目录下的`build` 文件夹中方面进一步操作

		$ gulp build

6. 打包`build` 文件夹下的项目文件，会自动生成`build-xxxx.zip` 的文件（`xxxx` 为打包时候的时间）

		$ gulp zip






