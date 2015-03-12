
# 利用Gulp 配置的前端项目自动化工作流
====

> 这个是本人利用Gulp 配置的适合自己的一个前端项目自动化工作流，目前正在实践运用中（通俗说用得还挺爽）。如果你有需要，可以参考本工作量构建适合自己的工作流。跪求Star，欢迎Fork！

## 功能模块（插件）

> 小标题含义：功能（对应的Gulp 插件）

- Compass（gulp-compass）

一个Sass 框架，本工作量主要是Compass + Sass，因此熟悉这两者是使用本工作流的基础条件。

- Sass（gulp-sass）

Sass 是与 Less 并举的 CSS 预处理器，一种全新的CSS 编码方式。

- 本地Web 服务器功能（gulp-webserver + tiny-lr）

能够让你的当前项目目录映射到Localhost 上，本功能主要是为了添加自动刷新（livereload）功能而添加。

- 网页自动刷新功能（gulp-livereload）

这个功能毫无疑问是最实用的，借助本livereload 模块，一旦监控到有文件改动就自动刷新页面。需要安装相应的Chrome 扩展配合使用。

- JS 文件合并（gulp-concat）

- JS 文件压缩（gulp-uglify）

- 图片无损压缩（gulp-imagemin + imagemin-pngquant）

经过实际使用发现，图片压缩略有损失，但基本无碍。

- 文件清理功能（gulp-clean）

在项目完成可以删除一些多余的文件

- 任务错误中断自动重传（gulp-plumber）

好吧，“任务错误中断自动重传”是我瞎命名的。默认的 Gulp 任务在执行过程中如果出错会报错并立即停止当前工作流（如在 watch Sass编译时候恰巧 Sass代码写错了）。使用plumber 模块可以在纠正错误后继续执行任务。

- 自动打包并按时间重命名（gulp-zip）

一般项目完成后需要整理文件并压缩以供交付使用或进行下一阶段的开发，本模块可以实现将项目文件自动打包并按时间重命名。

- 其他（gulp-copy、gulp-rename、opn）

其他杂项模块为该Gulp 添加文件复制、文件重命名、浏览器自动打开项目目录等基础功能


> 注：

> 1.因为CSS 代码主要是通过Compass 框架完成，所以本工作流不涉及CSS 压缩等其他功能模块（因为这些功能Compass 本身已经包含）。

> 2.后续多次用于实战项目后可能会有增减，即不断完善之以让个人前端工作效率最大化。


## 使用方法

1.  请先确保已经安装Gulp(需要 Node.js 环境) ，建议采用下面的代码全局安装

		$ npm install --global gulp 

2. 进入你的项目文件夹下`clone` 本 git 项目

		$ git clone https://github.com/Jeff2Ma/Gulp-Project.git
		
3. 按照个人的项目需求，重命名`gulp-project` 文件夹为你自己的项目英文名称，填写`Project.md `文件（`Project.md`文件在项目最终打包的时候会自动重命名为`README.md`保存在`build` 文件夹），填写`package.json` 文件的项目名称部分。如果需要进一步的个性化，可以编辑`gulpfile.js` 文件。
		
4. 然后捏，就基本上可以的了，默认任务：

		$ gulp
	
5. 如果项目已经完成，可以通过`build` 命令进行项目相关文件收集，项目文件最终会汇集到项目目录下的`build` 文件夹中方面进一步操作

		$ gulp build

6. 打包`build` 文件夹下的项目文件，会自动生成`build-xxxx.zip` 的文件（`xxxx` 为打包时候的时间）供交付使用或进行下一阶段的开发

		$ gulp zip






