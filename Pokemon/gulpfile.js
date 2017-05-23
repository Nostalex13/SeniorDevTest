var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
    .pipe(concat('script.main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('css', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('dist/styles/'))
});

gulp.task('html', function() {
   return gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
   gulp.watch('src/scripts/**/*.js', ['scripts']);
   gulp.watch('src/styles/**/*.css', ['css']);
   gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['css', 'scripts', 'html']);