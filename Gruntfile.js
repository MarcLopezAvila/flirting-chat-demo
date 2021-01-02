module.exports = function (grunt) {

    //Configure main project settings
    grunt.initConfig({

        sass: {
            main: {
                options: {
                    style: 'compressed',
                    noCache: true
                },
                files: {
                    'dist/css/style.min.css': 'src/assets/scss/style.scss'
                }
            }
        },

        concat: {
            core: {
                options: {
                    sourceMap: true
                },
                src: [
                    'src/core/appModule.js',
                    'src/core/**/*Module.js',
                    'src/core/**/*Run.js',
                    'src/core/**/*Config.js',
                    'src/core/**/*Decorator.js',
                    'src/core/**/*Factory.js',
                    'src/core/**/*Service.js',
                    'src/core/**/*Controller.js',
                    'src/core/**/*Directive.js',
                    'src/core/**/*Filter.js',
                    'src/core/appBootstrap.js'
                ],
                dest: 'dist/js/app/app.js'
            },

            lib: {
                src: [
                    'node_modules/angular/angular.min.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/ngstorage/ngStorage.js'
                ],
                dest: 'dist/js/app/lib.js'
            }
        },

        watch: {
            scss: {
                files: 'src/assets/scss/**/*.scss',
                tasks: ['sass']
            },

            core: {
                files: ['src/core/**/*.js'],
                tasks: ['concat:core']
            }
        }
    });

    //Load the plugin
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    //Custom tasks
    grunt.registerTask('init', ['sass', 'concat']);
    grunt.registerTask('ng',   ['concat:lib']);
    grunt.registerTask('app',  ['concat:core']);
};