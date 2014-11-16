module.exports = function (grunt) {
  require('time-grunt')(grunt);
  var aged = require('aged');

  var pkg = grunt.file.readJSON('package.json');
  // used for templates
  var pkgData = {
    data: {
      pkg: pkg
    }
  };

  var plugins = require('matchdep').filterDev('grunt-*');
  plugins.forEach(grunt.loadNpmTasks);

  var userConfig = require('./build.config.js');

  var versionTemplate =
    '<%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>';
  var version = grunt.template.process(versionTemplate, pkgData);

  var copyrightTemplate = 'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>';
  var copyright = grunt.template.process(copyrightTemplate, pkgData);

  var taskConfig = {
    pkg: pkg,

    clean: ['<%= destination_dir %>/bower_components', 'tmp'],

    meta: {
      banner:
        '/**\n' +
        ' * ' + version + '\n' +
        ' * ' + copyright + '\n' +
        ' */\n'
    },

    usebanner: {
      compile: {
        options: {
          banner: '<%= meta.banner %>',
          position: 'top',
          linebreak: true
        },
        files: {
          src: [
            '<%= destination_dir %>/<%= pkg.name %>*.js',
            '<%= destination_dir %>/<%= pkg.name %>*.css'
          ]
        }
      }
    },

    jshint: {
      all: userConfig.app_files.js,
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
    },

    complexity: {
      fresh: {
        src: '<%= app_files.js %>',
        options: {
          errorsOnly: false,
          cyclomatic: 10,
          halstead: 20,
          maintainability: 100
        }
      },
      aged: {
        src: '<%= app_files.js %>',
        filter: aged(2, 'days'),
        options: {
          errorsOnly: false,
          cyclomatic: 5,
          halstead: 12,
          maintainability: 100
        }
      }
    },

    readme: {
      options: {
        templates: './docs',
        readme: './docs/README.tmpl.md',
        docs: '.'
      }
    },

    sync: {
      all: {
        options: {
          // sync only these options
          sync: ['author', 'description', 'name', 'version'],
          from: 'package.json',
          to: 'src/manifest.json'
        }
      }
    },

    jsonlint: {
      all: {
        src: [ 'package.json', 'src/manifest.json' ]
      }
    },

    'nice-package': {
      all: {
        options: {
          license: function (value) {
            return value === 'MIT';
          }
        }
      }
    },

    'gh-pages': {
      options: {
        base: '<%= destination_dir %>'
      },
      src: [
        'index.html',
        'README.md',
        'favicon.png',
        'bower_components/angular/angular.js',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'bower_components/bootstrap/dist/fonts/*',
        'bower_components/jquery/jquery.min.js',
        'bower_components/jquery/jquery.min.map',
        'color-pusher.min.js', 'color-pusher.js',
        'color-pusher.min.css', 'color-pusher.css',
        'jquery.minicolors.png'
      ]
    },

    /* convert AngularJs html templates to cached JavaScript */
    html2js: {
      main: {
        options: {
          base: 'src',
          module: 'color-pusher-widget.templates'
        },
        src: [ 'src/*.tpl.html' ],
        dest: 'tmp/<%= pkg.name %>.templates.js'
      }
    },

    concat: {
      js: {
        options: {},
        src: [
          '<%= vendor_files.js %>',
          'tmp/*.js',
          '<%= app_files.js %>'
        ],
        dest: '<%= destination_dir %>/<%= pkg.name %>.js'
      },

      css: {
        options: {},
        src: [
          '<%= vendor_files.css %>',
          '<%= app_files.css %>'
        ],
        dest: '<%= destination_dir %>/<%= pkg.name %>.css'
      }
    },

    uglify: {
      options: {
        report: 'min'
      },
      js: {
        files: {
          '<%= destination_dir %>/<%= pkg.name %>.min.js': '<%= destination_dir %>/<%= pkg.name %>.js'
        }
      }
    },

    cssmin: {
      options: {
        report: 'min'
      },
      css: {
        files: {
          '<%= destination_dir %>/<%= pkg.name %>.min.css': '<%= destination_dir %>/<%= pkg.name %>.css'
        }
      }
    },

    // make sure index.html example works inside destination folder
    copy: {
      all: {
        files: [
          {
            expand: true,
            src: [
              'bower_components/bootstrap/dist/css/bootstrap.min.css',
              'bower_components/bootstrap/dist/js/bootstrap.min.js',
              'bower_components/bootstrap/dist/fonts/*',
              'bower_components/jquery/jquery.min.js',
              'bower_components/jquery/jquery.min.map',
              'bower_components/angular/angular.js',
              'index.html',
              'favicon.png',
              'README.md'
            ],
            dest: '<%= destination_dir %>'
          },
          {
            src: 'bower_components/jquery-minicolors/jquery.minicolors.png',
            dest: '<%= destination_dir %>/jquery.minicolors.png'
          }
        ]
      }
    }

  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  grunt.registerTask('build', ['clean', 'html2js', 'concat', 'copy', 'uglify', 'cssmin', 'usebanner']);
  grunt.registerTask('default', ['sync', 'jsonlint', 'nice-package', 'jshint',
    'complexity', 'build']);
};
