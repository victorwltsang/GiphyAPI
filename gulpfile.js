// while the trailing comma declaration is functionally the same as using `var`
// on each line. You don't really save many keystrokes and you introduce the 
// potential for leaking variables onto the global scope if somebody accidentally uses 
// a semi-colon instead of a comma after one of the intermediate lines.
// I only bring this up because I've had to track down bugs caused specifically
// by that scenario; and, when quickly parsing a document, trailing commas and semi-colons
// look an awful lot alike 😬
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./assets/css/**/*.css').on('change', reload);
    gulp.watch('./assets/javascript/**/*.js').on('change', reload);
    gulp.watch('*.html').on('change', reload);
});

gulp.task('default', ['serve']);
