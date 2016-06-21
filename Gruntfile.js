module.exports = function (grunt) {
  'use strict';
  // Force use of Unix newlines
  grunt.util.linefeed = '\n';
  // Set default file encoding utf-8.
  grunt.file.defaultEncoding = 'utf-8';
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      react: {
        src: 'node_modules/react/dist/react.min.js',
        dest: 'dest/lib/react.min.js'
      },
      react_dom: {
        src: 'node_modules/react-dom/dist/react-dom.min.js',
        dest: 'dest/lib/react-dom.min.js'
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss','*.sass'],
          dest: 'dest/css/',
          ext: '.css'
        }],
        options: {
          style: 'expanded'
        }
      }
    },
    watch: {
      scripts: {
        files: [
          'sass/*.scss'
        ],
        tasks: ['sass']
      }
    },
    connect: {
      server: {
        options: {
          port: 8000,
          base: '.',
          keepalive: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass', 'copy', 'connect']);
};