const {series, dest, src, watch} = require('gulp');
const imgmin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const webp = require('gulp-webp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const minify = require('gulp-minify');

const paths = {
    css : './src/sass/**/*.scss',
    pages : './pages/**/*.html',
    js : './src/js/**/*.js',
    img : './src/img/**/*'
}

function css(){
    return src(paths.css)
        .pipe(sass())
        .pipe(dest('./build/src/css'));
}
function js(){
    return src(paths.js)
        .pipe(concat('app.js'))
        .pipe(minify())
        .pipe(dest('./build/src/js'));
}
function minifyPages(){
    return src(paths.pages)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./build/'));
}
function minifyImg(){
    return src(paths.img)
        .pipe(imgmin())
        .pipe(webp())
        .pipe(dest('./build/src/img'))
}
function watchAll(){
    watch(paths.js, js);
    watch(paths.css, css);
    watch(paths.img, minifyImg);
    watch(paths.pages, minifyPages);
}
exports.default = series(css, js, minifyPages, minifyImg, watchAll);