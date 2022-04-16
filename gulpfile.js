const {src, dest, series, parallel, watch} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssMinify = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const del = require('del');

// Error
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// Image

const imageMin = require('gulp-imagemin');
const gulpIf = require('gulp-if');

const browserSync = require('browser-sync').create();

// IF
const isProd = process.argv.includes('--production');
const isDev = !isProd;

// Include
const fileinclude = require('gulp-include');

// Task html
const html = () => {
  return src('src/index.html')
    .pipe(fileinclude())
    .pipe(dest('dist/'))
    .pipe(browserSync.stream());
}

// Task styles
const styles = () => {
    return src('src/scss/main.scss', {sourcemaps: true})
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: 'SCSS',
        message: error.message
      }))
    }))
    .pipe(autoprefixer({
			cascade: false
		})) 
    .pipe(sass())
    .pipe(gcmq())
    .pipe(dest('dist/css', {sourcemaps: true}))
    .pipe(browserSync.stream())
    .pipe(gulpIf(isProd, cssMinify()))
    .pipe(gulpIf(isProd, rename({suffix: ".min"})))
    .pipe(gulpIf(isProd, dest('dist/css')));
}

// Task images
const images = () => {
  return src('src/img/**/*.{jpeg,jpg,png,svg,gif,webp}')
    .pipe(gulpIf(isProd, imageMin()))
    .pipe(dest('dist/img'));
}

// Task scripts
const scripts = () => {
  return src('src/js/**/*.js')
    .pipe(dest('dist/'));
}

// Task watchFiles
const watchFiles = () => {
  browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });


  watch('src/**/*.html', html);
  watch('src/scss/**/*.scss', styles);
  watch('src/js/*.js', scripts);
  watch('src/img/**/*.{jpeg,jpg,png,svg,gif,webp}', images);
}

// Task clean
const clean = () => {
  return del('dist/');
}

// Exports task
const build = series(clean, parallel(html, styles, scripts, images));
const dev = series(build, watchFiles);


exports.default = isProd ? build : dev;