var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');

gulp.task('minify-html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
});

gulp.task('default', gulp.series('minify-html'));
