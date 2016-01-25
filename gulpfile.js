var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('watch', ['copy'], function() {

  return gulp.watch('src/**', ['copy']);
});

gulp.task('copy', function() {
  //src/jsディレクトリ以下のファイルをコピー
  return gulp.src('src/**')
    .pipe(gulp.dest('dest'));

});


gulp.task('webserver', ['watch'], function() {
  gulp.src('dest')
    .pipe(webserver({
      port: 15555,
      livereload: true,
      directoryListing: {
        enabled: true,
        path: 'dest'
      },
      open: true
    }));
});

gulp.task('default', ['copy', 'watch', 'webserver']);
