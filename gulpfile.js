'use strict';

const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './build/'
    },
    port: 3000
  });
  done();
}

function browserSyncReload(done) {
  browsersync.reload();
  done();
}

function css() {
  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browsersync.stream());
}

function watchFiles() {
  gulp.watch('./src/scss/**/*', css);
}

function html() {
  gulp.watch('./build/index.html', browserSyncReload);
}

const watch = gulp.parallel(watchFiles, browserSync, html);

exports.watch = watch;
