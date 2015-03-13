
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    fileinclude = require('gulp-file-include'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    lr = require('tiny-lr'),
    server = lr();

// fileinclude: grab partials from templates and render out html files
// ==========================================
gulp.task('fileinclude', function() {
  return gulp.src('./templates/*.tpl.html')
    .pipe(fileinclude())
    .pipe(rename({extname: ""}))
    .pipe(rename({extname: ".html"}))
    .pipe(gulp.dest('./'))
    .pipe(livereload(server))
    .pipe(notify({ message: 'Includes: included' }));
});

//  Connect: sever task
//===========================================
gulp.task('connect', function() {
  connect.server({
    port: 1337,
    root: [__dirname],
    livereload: false
  });
});

function watchStuff(task) {
  // Listen on port 35729
  server.listen(35729, function (err) {
    if (err) {
      return console.error(err);
      //TODO use notify to log a message on Sass compile fail and Beep
    }
    // watch task for gulp-includes
    gulp.watch('./templates/*.html', ['fileinclude']);

  });
}

//  Watch and Livereload using Libsass
//===========================================
gulp.task('watch', function() {
  watchStuff();
});

//  Default Gulp Task
//===========================================
gulp.task('default', ['fileinclude'], function() {});
gulp.task('serve', ['fileinclude', 'connect'], function() {});
gulp.task('watch', ['fileinclude', 'connect', 'watch'], function() {});

