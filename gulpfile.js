var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    changed     = require('gulp-changed'),
    uglify      = require('gulp-uglify'),
    stylus      = require('gulp-stylus'),
    plumber     = require('gulp-plumber'),
    todo        = require('gulp-todo'),
    livereload  = require('gulp-livereload');

var paths = {
  scripts: "js/**/*.js",
  style: "style/**/*.styl"
};

gulp.task('scripts', function(){
  return gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('js/'))
    .pipe(livereload());
});

gulp.task('stylus', function() {
  gulp.src('style/style.styl')
    .pipe(plumber())
    .pipe(stylus({
      set:['compress']
    }))
    .pipe(gulp.dest('./'))
    .pipe(livereload());
});

gulp.task('html', function() {
  gulp.src('./**/*.php')
    .pipe(livereload());
});

gulp.task('js', function() {
  gulp.src(paths.scripts)
    .pipe(plumber())
    .pipe(livereload());
});

gulp.task('watch', function() {
  gulp.watch(paths.style, ['stylus',]);
  gulp.watch('./**/*.php', ['html']);
  gulp.watch(paths.scripts, ['js']);
});

gulp.task('default', ['stylus', 'html', 'js', 'watch']);
