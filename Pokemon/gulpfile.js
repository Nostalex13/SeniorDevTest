var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglifycss = require('gulp-uglifycss');

gulp.task('scripts', function() {
  return gulp.src('src/scripts/*.js')
   //  .pipe(concat('script.main.js'))
    .pipe(gulp.dest('dist/scripts/'))
});

gulp.task('css', function() {
  return gulp.src('src/styles/*.css')
    .pipe(concat('styles.main.css'))
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

gulp.task('fonts', function() {
   return gulp.src('src/fonts/**')
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('img', function() {
   return gulp.src('src/img/**')
      .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
   gulp.watch('src/scripts/**/*.js', ['scripts']);
   gulp.watch('src/styles/**/*.css', ['css']);
   gulp.watch('src/*.html', ['html']);
});

gulp.task('default', ['css', 'scripts', 'html', 'fonts', 'img']);
