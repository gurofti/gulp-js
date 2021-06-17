const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')
const sass = require('gulp-sass')

// gulp.task -> görev oluşturmak için
// gulp.src -> kaynak dosyalari
// gulp.dest -> hedef dizinimiz
// gulp.watch -> izleme ve görev çalıştırma
// pipe -> modify


/*
gulp.task('default', () => {
    console.log('gulp default run')
})
*/

gulp.task('message', () => {
    console.log('gulp run')
})

gulp.task('imageMin', () => {
    gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images/'))
        .pipe(browserSync.stream())
})

gulp.task('html', () => {
    gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.stream())
})

gulp.task('jsMin', () => {
    gulp.src('./src/scripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
})

gulp.task('cssMin', () => {
    gulp.src('./src/styles/**/*.css')
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles/'))
})

gulp.task('jsCon', () => {
    gulp.src('./src/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts/'))
        .pipe(browserSync.stream())
})

gulp.task('cssCon', () => {
    gulp.src('./src/styles/**/*.css')
        .pipe(concat('all.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream())
})

gulp.task('sass', () => {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles/'))
})

function buildScript() {
    return gulp.src('./src/styles/**/*.css')
        .pipe(concat('all.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/styles/'))
        .pipe(browserSync.stream())
}

function reload(done) {
    browserSync.reload();
    done();
}

gulp.task('serve', (cb) => {
    browserSync.init({
        server: './dist/'
    })
    gulp.watch('./src/styles/**/*.css', gulp.series(buildScript, reload))
    gulp.watch('./src/scripts/**/*.js', gulp.series('jsCon'))
    gulp.watch('./src/images/*', gulp.series('imageMin'))
    gulp.watch('./src/*.html', gulp.series('html'))
    cb();
})

gulp.task('default', gulp.parallel('serve'));
