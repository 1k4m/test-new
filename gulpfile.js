const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compileSass(done) {
    return gulp.src('sass/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('css'))
        .on('end', done);
}

function watchSass() {
    gulp.watch('sass/**/*.scss', compileSass);
}

exports.default = watchSass;
