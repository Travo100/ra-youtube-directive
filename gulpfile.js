var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    plumber = require('gulp-plumber'),
    scss = require('gulp-sass'),
    ngAnnotate = require('gulp-ng-annotate'),
    sourcemaps = require('gulp-sourcemaps'),
    templateCache = require('gulp-angular-templatecache'),
    nodemon = require('gulp-nodemon');

gulp.task('nodemon-dev', function () {
  nodemon({ script: 'server.js'
          , ext: 'html sass js'
          , ignore: ['ignored.js']
          , tasks: ['watch-dev'] })
    .on('start', ['watch-dev'])
    .on('change', ['watch-dev'])
    .on('restart', function () {
      console.log('restarted!')
    })
});

gulp.task('nodemon', function () {
  nodemon({ script: 'server.js'
          , ext: 'html sass js'
          , ignore: ['ignored.js']
          , tasks: ['watch'] })
    .on('start', ['watch'])
    .on('change', ['watch'])
    .on('restart', function () {
      console.log('restarted!')
    })
});


// gulp.task('delete', function(){
//   del(['./public/assets/*'], function(err) {
//     console.log('Files deleted');
//   })
// });

gulp.task('style', function(){
  return gulp
    .src('./public/css/ra-youtube.css')
    .pipe(minifyCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./public/assets/'));
});

gulp.task('scss', function(){
  return gulp
  .src('./public/sass/*.scss')
  .pipe(scss())
  .pipe(gulp.dest('./public/css'))
});

// task to lint, minify, and concat frontend files
gulp.task('angular', function() {
  return gulp.src(['./public/js/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(ngAnnotate())
  .pipe(concat('ra-youtube.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./public/assets'));
});

// task to lint, minify, and concat frontend files
gulp.task('angular-dev', function() {
  return gulp.src(['./public/js/*.js'])
  .pipe(sourcemaps.init())
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(ngAnnotate())
  .pipe(concat('ra-youtube.min.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./public/assets'));
});

gulp.task('template', function(){
  return gulp.src('./public/templates/*.html')
  .pipe(templateCache({module : 'ra-youtube'}))
  .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function (){
  gulp.watch('./public/sass/*.scss', ['scss']);
  gulp.watch('./public/sass/*.sass', ['sass']);
  gulp.watch('./public/css/*.css', ['style']);
  gulp.watch('./public/js/*.js', ['angular']);
  gulp.watch('./public/templates/*.html', ['template']);
});

gulp.task('watch-dev', function (){
  gulp.watch('./public/sass/*.scss', ['scss']);
  gulp.watch('./public/sass/*.sass', ['sass']);
  gulp.watch('./public/css/*.css', ['style']);
  gulp.watch('./public/js/*.js', ['angular-dev']);
  gulp.watch('./public/templates/*.html', ['template']);
});

gulp.task('default', ['nodemon', 'style', 'angular', 'template', 'scss', 'watch']);
gulp.task('dev', ['nodemon-dev' ,'style', 'angular-dev', 'template', 'scss', 'watch-dev']);