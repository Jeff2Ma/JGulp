# [gulp](https://github.com/creative/gulp-tinypng)-tinypng

> Minify PNG  using [tinypng](https://tinypng.com/)



## Install

Install with [npm](https://npmjs.org/package/gulp-tinypng)

```
npm install --save-dev gulp-tinypng
```


## Example

```js
var gulp = require('gulp');
var imagemin = require('gulp-tinypng');

gulp.task('tinypng', function () {
	gulp.src('src/image.png')
		.pipe(tingpng('API_KEY'))
		.pipe(gulp.dest('dist'));
});
```


## API

### tinypng(options)


## License

MIT © [Gaurav Jassal](http://gaurav.jassal.me)