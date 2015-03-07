/* global require */
var lr         = require('tiny-lr'),
    gulp       = require('gulp'),
    compass    = require('gulp-compass'),
    livereload = require('gulp-livereload'),
    server     = lr();

var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var opn       = require('opn');

var localserver = {
  host: 'localhost',
  port: '8001'
}


gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host:             localserver.host,
      port:             localserver.port,
      livereload:       true,
      directoryListing: false
    }));
});

gulp.task('openbrowser', function() {
  opn( 'http://' + localserver.host + ':' + localserver.port );
});


gulp.task('compass', function() {
  gulp.src('./sass/*.scss')
    .pipe(plumber())
    .pipe(compass({
      config_file: './config.rb'
    }));
});


 
 
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
 
gulp.task('default', function(){
  
  gulp.run('compass');
 
  gulp.run('watch');
  
  gulp.run('webserver');

  gulp.run('openbrowser');
 
});