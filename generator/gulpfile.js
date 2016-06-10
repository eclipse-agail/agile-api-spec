var gulp = require('gulp');

gulp.task('build', function() {
  require("./index").export("html");
});

gulp.task('default', function() {

  gulp.watch([
    "./lib/**/*.js",
    "./template/**/*.html",
    "../api/**/*.yml",
  ], ['build']);

});
