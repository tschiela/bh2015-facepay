'use strict';

var path = require('path');


var sourceFolder = path.join('src');
var nodeModules = path.join('node_modules');
var dist = path.join('server', 'public');
var sources = {
  less: path.join(sourceFolder, 'less'),
  js: path.join(sourceFolder, 'js')
};
var jsSources = [
  path.join(nodeModules, 'jquery', 'dist', 'jquery.js'),
  path.join(nodeModules, 'bootstrap', 'dist', 'js', 'bootstrap.js'),
  path.join(nodeModules, 'node-waves', 'dist', 'waves.js'),
  path.join(nodeModules, 'angular', 'angular.js'),
  path.join(nodeModules, 'angular-ui-router', 'build', 'angular-ui-router.js'),
  path.join(nodeModules, 'angular-local-storage', 'dist', 'angular-local-storage.js'),
  path.join(sources.js, 'script.js'),
  path.join(sources.js, 'vendor', '**', '*.js'),
  path.join(sources.js, 'app', '**', '*.js'),
  path.join(sources.js, 'checkoutApp', '**', '*.js')
];

module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        spawn: false,
        debounceDelay: 250,
        livereload: true
      },
      less: {
        files: path.join(sources.less, '**', '*.less'),
        tasks: ['less:development']
      },
      js: {
        files: path.join(sources.js, '**', '*.js'),
        tasks: ['concat']
      },
      templates: {
        files: path.join('server', 'public', '**', '*.html')
      }
    },
    clean: [path.join(dist, 'css'), path.join(dist, 'js')],
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          "server/public/css/style.css": path.join(sources.less, 'index.less')
        }
      },
      production: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          plugins: [
            new (require('less-plugin-clean-css'))()
          ]
        },
        files: {
          "server/public/css/style.css": path.join(sources.less, 'index.less')
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: jsSources,
        dest: path.join(dist, 'js', 'app.min.js')
      }
    },
    uglify: {
      app: {
        options: {
          mangle: true
        },
        files: {
          'server/public/js/app.min.js': [path.join(dist, 'js', 'app.min.js')]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // default task
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['clean', 'less:production', 'concat', 'uglify']);
};
