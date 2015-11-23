import gulp from 'gulp'
import babelify from 'babelify'
import browserSync from 'browser-sync'
import browserify from 'gulp-browserify'
import browserifyShim from 'browserify-shim'
import rename from 'gulp-rename'
import stylus from 'gulp-stylus'
import concat from 'gulp-concat'
import jade from 'gulp-jade'
import es from 'event-stream'
import rimraf from 'rimraf'
import ghPages from 'gulp-gh-pages'

const PRODUCTION = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production';
const DIST = './dist'

gulp.task('es6', () => {
    return gulp
    .src('./src/js/main.js')
    .pipe(browserify({
        transform: ['babelify', 'browserify-shim', 'require-globify'],
        debug: !PRODUCTION,
        compress: PRODUCTION
        // bundleExternal: false
    }))
    .on('error', console.error.bind(console))
    .pipe(rename('app.js'))
    .pipe(gulp.dest( DIST + '/js/'))
    .pipe(browserSync.stream())
})

gulp.task('stylus', () => {
    let opts = {
        compress: PRODUCTION
    }
    
    return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus(opts))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
})

gulp.task('cdn', () => {
    const jsFiles = [
        'angular/angular',
        'angular-animate/angular-animate',
        'angular-aria/angular-aria',
        'angular-material/angular-material',
        'angular-ui-router/build/angular-ui-router',
        'angular-sanitize/angular-sanitize',
        'markdown-it/dist/markdown-it'
        ].map(addMin('.js'))
    const cssFiles = [
        'angular-material/angular-material',
        'angular-material/angular-material.layouts',
        'bootstrap/dist/css/bootstrap',
        'font-awesome/css/font-awesome'
        ].map(addMin('.css')).concat(['./node_modules/highlight.js/styles/default.css'])

    const fontFiles = [
        'bootstrap/dist/fonts/*.*',
        'font-awesome/fonts/*.*'
    ].map(f => './node_modules/' + f)
    
    gulp.src(jsFiles).pipe(gulp.dest(DIST + '/js/'))
    gulp.src(cssFiles).pipe(gulp.dest(DIST + '/css/'))
    gulp.src(fontFiles).pipe(gulp.dest(DIST + '/fonts/'))
    
    function addMin(suffix) {
        return function(file) {
            return './node_modules/' + file + '.min' + suffix;
        }
    }
})

gulp.task('clean', () => {
    rimraf.sync(DIST)
})

gulp.task('view', () => {
    return es.merge(
        gulp.src(['./src/view/**/*.html'], {base: 'src'}),
        gulp.src('./src/*.html'),
        gulp.src(['./src/view/**/*.jade'], {base: 'src'}).pipe(jade())
        .on('error', console.error.bind(console))
    ).pipe(gulp.dest(DIST))
    .pipe(browserSync.stream())
})

gulp.task('build', ['clean', 'es6', 'stylus', 'view', 'cdn'])

gulp.task('watch', () => {
    gulp.watch('./src/js/**/*.js', ['es6'])
    gulp.watch('./src/stylus/**/*.styl', ['stylus'])
    gulp.watch(['./src/**/*.html', './src/**/*.jade'], ['view'])
})

gulp.task('reload', () => {
    browserSync.reload()
})

gulp.task('server', () => {
    browserSync.init({
        server: {
            baseDir: DIST
        },
        ui: {
            port: 8001
        },
        port: 8000
    })
    
    // gulp.watch(DIST, ['reload'])
})

gulp.task('deploy', ['build'], () => {
    return gulp.src(DIST + '/**/*.*').pipe(ghPages())
})

gulp.task('default', ['clean', 'build', 'server', 'watch'])