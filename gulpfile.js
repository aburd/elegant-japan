var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

var input = './dev/sass/*.sass';
var output = './public/css';
var cssInput = './public/css/*.css';
var dist = './public/dist';

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest(output));
});

gulp.task('concat-minify-css', function () {
  return gulp
    .src(cssInput)
    .pipe(concatCss("./bundle.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(dist));
});

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(input, ['sass', 'concat-minify-css'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('default', ['sass', 'concat-minify-css', 'watch']);
