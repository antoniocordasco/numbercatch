'use strict';
module.exports = function(grunt) {

// Project configuration.
    grunt.initConfig({
        typescript: {
            base: {
                src: ['numbercatch/*.ts'],
                dest: 'development/',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    sourceMap: true,
                    basePath: 'numbercatch',
                    declaration: true
                }
            }
        },
        copyto: {
            development: {
                files: [
                    {cwd: 'numbercatch/', src: ['*.html', 'vendor/*.*', 'assets/**'], dest: 'development/', expand: true}
                ]
            }
        },

        clean: {
            everything: ["development/"]
        }
    });





    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('development', [
        'clean:everything',
        'typescript:base',
        'copyto:development'
    ]);
};