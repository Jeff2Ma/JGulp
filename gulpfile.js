var lr         = require('tiny-lr'),
    gulp       = require('gulp'),
    compass    = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    server     = lr(),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    webserver = require('gulp-webserver'),
    opn       = require('opn');

//配置本地Web 服务器：主机+端口
var localserver = {
  host: 'localhost',
  port: '8001'
}

//压缩javascript 文件   
gulp.task('minifyjs',function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('js/min'))
});

//开启本地 Web 服务器功能
gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host:             localserver.host,
      port:             localserver.port,
      livereload:       true,
      directoryListing: false
    }));
});

//通过浏览器打开本地 Web服务器 路径
gulp.task('openbrowser', function() {
  opn( 'http://' + localserver.host + ':' + localserver.port );
});

//Compass 进行SASS 代码
gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb'
    }));
});

//文件监控
gulp.task('watch', function () {

  server.listen(35729, function (err) {
    if (err){
      return console.log(err);
    }
  });
 
  gulp.watch('./sass/*.scss', function () {
    gulp.run('compass');
  });
 
  gulp.watch(['./css/*.css','./*.html'],  function (e) {
    server.changed({
      body: {
        files: [e.path]
      }
    });
  });
 
});

//默认任务
gulp.task('default', function(){
  console.log('Starting Gulp tasks, enjoy coding!');
  gulp.run('compass');
  gulp.run('watch');
  gulp.run('webserver');
  gulp.run('openbrowser');
});

//项目完成提交任务
gulp.task('build', function(){
  gulp.run('compass');
  gulp.run('minifyjs');
});