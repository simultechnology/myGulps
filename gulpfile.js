var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('watch', function() {

  gulp.watch('src/**', ['copy']);

  console.log('watch');
});

gulp.task('copy', function() {
  //src/jsディレクトリ以下のファイルをコピー
  gulp.src('src/**')
    .pipe(gulp.dest('dest'));

  //src/htmlディレクトリ以下のファイルをコピー
  //gulp.src('src/html/**')
  //  .pipe(gulp.dest('dest/html'));
});


gulp.task('webserver', function() {
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
