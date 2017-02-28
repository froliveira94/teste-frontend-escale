var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass');

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("./src/scss/**/*.scss", ['sass']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('server', ['serve']);