module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n * <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author %>\n * Licensed under <%= pkg.license %>\n * File date: <%= grunt.template.today("dd-mm-yyyy") %>\n */\n',
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/*.js','test/spec/*.js'],
      options: {
        globals: {
          jQuery: false
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'bin/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        files: {
          'bin/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jasmine : {
      src : 'src/**/*.js',
      options : {
        specs : 'test/spec/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
    

  grunt.registerTask('default', ['jshint','jasmine']);
  
  grunt.registerTask('build', ['jshint','jasmine','concat','uglify']);

};