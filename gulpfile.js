const gulp = require('gulp');
const less = require('gulp-less');
const cssnano = require('gulp-cssnano');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const watchify = require('watchify');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const args = require('yargs').argv;
const _if = require('gulp-if');
const babelify = require('babelify').configure({
  presets: ['es2015', 'react'],
});
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const livereload = require('gulp-livereload');


const isProduction = !!args.production;

const errorHandler = {
  errorHandler: notify.onError('Error: <%- error.message%>'),
};

const paths = {
  styleRoot: 'frontend/styles/app.less',
  reactRoot: 'frontend/react/index.jsx',
  lessFiles: 'frontend/styles/**/*.less',
  outputFolder: 'static',
  jsBundle: 'app.min.js',
};

  
function makeBrowserifyInstance() {
  return browserify({
    cache: {},
    packageCache: {},
    entries: paths.reactRoot,
    extensions: ['.jsx'],
    transform: [babelify],
    debug: !isProduction,
  });
}

const watchifyInstance = watchify(makeBrowserifyInstance());


function bundle(instance) {
  return instance.bundle()
    .on('error', (err) =>
        errorHandler.errorHandler(err)
    )
    .pipe(source(paths.jsBundle))
    .pipe(buffer())
    .pipe(_if(!isProduction, sourcemaps.init({ loadMaps: true })))
    .pipe(_if(isProduction, uglify()))
    .pipe(_if(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.outputFolder))
    .pipe(_if(!isProduction, livereload()))
    .pipe(_if(!isProduction, notify('Built file ${file.relative}')));
}

gulp.task('react', () =>
  bundle(makeBrowserifyInstance())
);

gulp.task('watchReact', () => {
  livereload.listen();
  bundle(watchifyInstance);
  watchifyInstance.on('update', bundle.bind(null, watchifyInstance));
});

gulp.task('less', () =>
  gulp.src(paths.styleRoot)
    .pipe(less())
    .pipe(_if(isProduction, cssnano()))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.outputFolder))
    .pipe(_if(!isProduction, livereload()))
    .pipe(_if(!isProduction, notify('Built file ${file.relative}')))
);

gulp.task('watchLess', ['less'], () => {
  livereload.listen();
  gulp.watch(paths.lessFiles, ['less']);
});

gulp.task('watch', [
  'watchLess',
  'watchReact',
]);

gulp.task('build', [
  'less',
  'react',
]);

gulp.task('default', ['build']);
