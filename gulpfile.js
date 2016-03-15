var gulp = require('gulp');
inject = require('gulp-inject');
mainbowerfiles = require('main-bower-files');
clean = require('gulp-clean');
browserSync = require('browser-sync').create();
angularFileSort =  require('gulp-angular-filesort');

var config = {
    paths: {
        src: './src',
        build: './build',
        bower: './bower_components'
    }
};

gulp.task('clean',function(){
    return gulp.src(config.paths.build, {read:false})
        .pipe(clean());
});

gulp.task('inject', function () {
    var sources = gulp.src([
        config.paths.src + '/**/*.js',
        config.paths.src + '/**/*.css'
    ], {read: false});

    var cssFiles = gulp.src([
        config.paths.src + '/**/*.css'
    ], {read: false});

    var jsFiles = gulp.src([
        config.paths.src + '/**/*.js'])
        .pipe(angularFileSort());

    return gulp.src(config.paths.src + '/index.html')
        .pipe(inject(gulp.src(mainbowerfiles(),{read: false}), {name: 'bower'}))
        .pipe(inject(cssFiles,{ignorePath:'src'} , {addRootSlash:false}))
        .pipe(inject(jsFiles,{ignorePath:'src'} , {addRootSlash:false}))
        .pipe(gulp.dest(config.paths.build))
});

gulp.task('browser-sync',['inject'], function() {
    browserSync.init({
        server: {
            baseDir: [config.paths.build,config.paths.bower,config.paths.src],
            routes:{
                '/bower_components':"bower_components"
            }
        },
        files:[
            config.paths.src + "/**",
        ]
    });
});
