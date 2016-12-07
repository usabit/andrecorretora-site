var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jeet = require('jeet');
var rupture = require('rupture');
var nib = require('nib');
var prefixer = require('autoprefixer-stylus');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var bower = require('gulp-bower'); // roda bower install por padrão ou algum outro comando do bower pelo gulp    
var wiredep = require('wiredep').stream; // aplica os arquivos do bower diretamente na index.html do sistema
var del = require('del');
var sequence = require('run-sequence');
var notify = require('gulp-notify');
var mainBowerFiles = require('gulp-main-bower-files');

gulp.task('stylus', function() {
    return gulp.src('_assets/styl/main.styl')
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: [nib(), prefixer(), jeet(), rupture()],
            compress: true
        }))
        //write('.') para jogar o mapa do css na mesma pasta em que vai ser colocado o css gerado
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
    ;
});

gulp.task('reload', function() {
    gulp.src(['_site/**/*.html', '_site/**/*.css', '_site/**/*.js'])
        .pipe(connect.reload());
});

gulp.task('js', function() {
    return gulp.src('_assets/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .on('error', notify.onError({ Title: 'JSHint', message: 'Errors on javascript.' }))
    ;
});

gulp.task('imagemin', function() {
    return gulp.src('_assets/img/**/*')
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/img/'));
});

gulp.task('watch', function() {
    gulp.watch('_assets/styl/**/*.styl', ['stylus']);
    gulp.watch('_assets/js/**/*.js', ['js']);
    gulp.watch('_assets/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch(['_site/**/*.html', '_site/**/*.css', '_site/**/*.js'], ['reload']);
});

gulp.task('clean', function(cb) {
    return del(['_site/', 'assets/', 'bower_components/']);
});

gulp.task('bower-install', function() {
    // roda bower install no root
    return bower();
});

gulp.task('bower', ['bower-install'], function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            'overrides': {
                'font-awesome': {
                    'main': [
                      'css/font-awesome.css',
                      'fonts/fontawesome-webfont.eot',
                      'fonts/fontawesome-webfont.woff',
                      'fonts/fontawesome-webfont.woff2',
                      'fonts/fontawesome-webfont.otf',
                      'fonts/fontawesome-webfont.ttf',
                      'fonts/fontawesome-webfont.svg'
                    ]
                },
                'owl.carousel': {
                    'main': [
                        "dist/owl.carousel.min.js",
                        "dist/assets/owl.carousel.min.css",
                        "dist/assets/owl.theme.default.min.css"
                    ]
                },
                'jquery-ui': {
                    'main': [
                        'jquery-ui.js',
                        'themes/ui-darkness/jquery-ui.min.css',
                        'themes/ui-darkness/theme.css',
                        'themes/ui-darkness/images/ui-bg_inset-soft_25_000000_1x100.png',
                        'themes/ui-darkness/images/ui-bg_glass_20_555555_1x400.png',
                        'themes/ui-darkness/images/ui-bg_inset-soft_30_f58400_1x100.png',
                        'themes/ui-darkness/images/ui-icons_cccccc_256x240.png',
                        'themes/ui-darkness/images/ui-icons_222222_256x240.png',
                        'themes/ui-darkness/images/ui-bg_glass_40_0078a3_1x400.png',
                        'themes/ui-darkness/images/ui-icons_ffffff_256x240.png'
                    ]
                }
            }
        }))
        .pipe(gulp.dest('assets/libs'));


});

gulp.task('wiredep', function() {
    return gulp.src(['_includes/footer.html', '_includes/head.html'])
        // .pipe(wiredep({
        //   ignorePath: '../_includes'
        // }))
        // .pipe(wiredep({ ignorePath: '../_site' }))
        .pipe(wiredep({ ignorePath: '..' }))
        .pipe(gulp.dest('_includes/'));
});

gulp.task('sequence', function(callback) {
    sequence(
        'bower', 
        ['js', 'stylus', 'imagemin'],
        'wiredep',
        'watch',
        callback
    );
});

gulp.task('default', ['sequence'], function() {
    connect.server({
        root: '_site',
        livereload: true
    });
});
