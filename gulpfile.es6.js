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
import autoprefixer from 'gulp-autoprefixer'
import sourcemaps from 'gulp-sourcemaps'
import imagemin from 'gulp-imagemin'
import watch from 'gulp-watch'
import uglify from 'gulp-uglify'
import angularInjector from 'gulp-angular-injector'
import resrc from 'gulp-resrc'
import condition from 'gulp-if'
import header from 'gulp-header'

const PRODUCTION = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() === 'production';
const DIST = './dist'

gulp.task('es6', () => {
    return gulp
    .src('./src/js/main.js')
    .pipe(browserify({
        transform: ['babelify', 'browserify-shim', 'require-globify'],
        debug: !PRODUCTION
    }))
    .on('error', err => console.error(err.stack))
    .pipe(angularInjector({
        token: 'ƒ'
    }))
    .pipe(condition(PRODUCTION, uglify()))
    .pipe(rename('app.js'))
    .pipe(condition(PRODUCTION, header('// Made by XGHeaven\n')))
    .pipe(gulp.dest( DIST + '/js/'))
    .pipe(browserSync.stream())
})

gulp.task('stylus', () => {
    let opts = {
        compress: PRODUCTION
    }

    return gulp
    .src('./src/stylus/**/*.styl')
    .pipe(condition(PRODUCTION, sourcemaps.init()))
    .pipe(stylus(opts))
    .pipe(condition(PRODUCTION, sourcemaps.write()))
    .pipe(concat('app.css'))
    .pipe(autoprefixer({
        browsers: 'last 2 versions'
    }))
    .pipe(condition(PRODUCTION, header('/* Made by XGHeaven */\n')))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(browserSync.stream())
})

gulp.task('image', () => {
    return gulp.src('./src/image/**/*.*')
    .pipe(imagemin({
        progressive: true
    }))
    .pipe(gulp.dest(DIST + '/image'))
})

gulp.task('cdn', () => {
    const jsFiles = [
        'angular/angular',
        'angular-animate/angular-animate',
        'angular-aria/angular-aria',
        'angular-material/angular-material',
        'angular-ui-router/release/angular-ui-router',
        'angular-sanitize/angular-sanitize',
        'angular-messages/angular-messages',
        'ngstorage/ngStorage',
        'marked/marked'
        ].map(addMin('.js'))
    const cssFiles = [
        'angular-material/angular-material',
        'angular-material/angular-material.layouts',
        'bootstrap/dist/css/bootstrap',
        'font-awesome/css/font-awesome'
        ].map(addMin('.css')).concat([
            './node_modules/highlight.js/styles/default.css'
        ])

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

gulp.task('build', ['clean', 'es6', 'stylus', 'view', 'cdn', 'image'])

gulp.task('watch', () => {
    watch('./src/js/**/*.js', () => gulp.run(['es6']))
    watch('./src/stylus/**/*.styl', () => gulp.run(['stylus']))
    watch(['./src/**/*.html', './src/**/*.jade'], () => gulp.run(['view']))
    watch('./src/image/**/*', () => gulp.run(['image']))
})

gulp.task('reload', () => {
    browserSync.reload()
})

gulp.task('server', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: DIST
        },
        ui: false,
        port: 8000
    })
})

gulp.task('predeploy', () => {
    return gulp.src('CNAME').pipe(gulp.dest(DIST))
})

gulp.task('deploy', ['build', 'predeploy'], () => {
    return gulp.src(DIST + '/**/*').pipe(ghPages())
})

gulp.task('default', ['clean', 'build', 'server', 'watch'])