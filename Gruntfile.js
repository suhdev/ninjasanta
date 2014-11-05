module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    dirs:{
      jsSrc:'js',
      jsLibSrc:'js/lib',
      jsAppSrc:'js/game',
      jsPluginsSrc:'js/plugins',
      jsCompiled:'compiled',
      jsCompiledApp:'compiled/app',
      jsDest:'scripts',
    },
    clean:['dest/*.js','docs','phpdocs','doc','deploy','app/database/seeds/SeedUsersTable.php','app/database/seeds/SeedExperiencesTable.php','deploy_fi','deploy_se','deploy_dk','deploy_no'],
    concat :{
      lib:{
        src:['<%= dirs.jsLibSrc %>/jquery.min.js','<%= dirs.jsLibSrc %>/bootstrap.min.js','<%= dirs.jsLibSrc %>/angular.min.js'],
        dest:'<%= dirs.jsDest %>/lib.min.js'
      },
      dev:{
        src:['<%= dirs.jsAppSrc %>/*.js'],
        dest:'<%= dirs.jsDest %>/game.min.js'
      },
      deploy:{
        src:['<%= dirs.jsAppSrc %>/*.js'],
        dest:'<%= dirs.jsCompiled %>/game.js'
      }
    },
    uglify: {
      options: {
        mangle:false,
      },
      app:{
        src: ['<%= dirs.jsCompiled %>/game.js'],
        dest: '<%= dirs.jsDest %>/game.min.js'
      }
    },
    
    jsdoc : {
        dist : {
            src: ['compiled/all.js'], 
            options: {
                destination: 'doc'
            }
        }
    },
    
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-ssh-deploy');
  grunt.loadNpmTasks('grunt-sftp-deploy');
  grunt.loadNpmTasks('grunt-file-creator');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-phpdocumentor');
  grunt.loadNpmTasks('grunt-concurrent');



  // Default task(s).
  grunt.registerTask('default', ['clean','concat:lib','concat:dev']);

  grunt.registerTask('dep', ['clean','concat:lib','concat:deploy','uglify:app']);

};