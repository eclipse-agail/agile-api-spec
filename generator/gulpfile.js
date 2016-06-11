var gulp = require('gulp');

gulp.task('build', function() {
  // require("./index").exportAll();
  var child = require("child_process").spawn(__dirname + "/bin/api-export");

  child.stderr.pipe(process.stderr);
  child.stdout.pipe(process.stdout);
});

gulp.task('default', function() {

  gulp.watch([
    "./lib/**/*.js",
    "./lib/renderer/**/*.js",
    "./lib/model/**/*.js",
    "./template/**/*.html",
    "../api/**/*.yml",
  ], ['build']);

});
