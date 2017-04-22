import gulp from 'gulp';
import gutil from 'gulp-util';

import { writeIndex } from 'create-index';
 
gulp.task('create-index', () => {
    writeIndex([
        './src/components',
        './src/containers',
        './src/actions',
        './server/models',
    ]);
});

// webpack 
// minify
// uglify

gulp.task('default', ['create-index', ], () => {
    gutil.log('gulp is runnig');
});
