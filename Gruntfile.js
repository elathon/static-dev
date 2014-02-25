module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		serverPath: "web_files",
    templatesPath: "templates",

		connect: {
		  server: {
		    options: {
		    	hostname: '*',
		      port: 1234,
		      base: '<%= serverPath %>'
		    }
		  }
		},

		sass: {
			dist: {
				options: {
					// Fixes vagrant sass caching issue
					cacheLocation: '../tmp/.sass-cache',
          sourcemap: true,
          style: 'expanded',
          quiet: true
				},
				files: {
					'<%= serverPath %>/_inc/styles/screen.css' : '<%= serverPath %>/_inc/styles/sass/screen.scss'
				}
			}
		},

		htmlbuild: {
        dev: {
          src: '<%= templatesPath %>/*.html',
          dest: '<%= serverPath %>/',
          options: {
              beautify: true,
              relative: true,
              sections: {
                  layout: {
                      header: '<%= templatesPath %>/_partials/header.html',
                      footer: '<%= templatesPath %>/_partials/footer.html'
                  }
              },
              data: {
                  // Data to pass to templates
                  version: "0.1.0",
                  title: "test"
              }
          }
        }
    },

    uglify: {
    	options: {
	      mangle: false,
        preserveComments: true
	    },
    	minify: {
    		files: {
    			'<%= serverPath %>/_inc/js/app.min.js': ['<%= serverPath %>/_inc/js/app.js'],
    			'<%= serverPath %>/_inc/js/plugins.min.js': ['<%= serverPath %>/_inc/js/plugins.js']
    		}
    	}
    },

		watch: {
			css: {
				files: '<%= serverPath %>/**/*.scss',
				tasks: ['sass']
			},
			html: {
				files: '<%= templatesPath %>/**/*.html',
				tasks: ['htmlbuild']
			}
		}
	});

	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['htmlbuild', 'sass', 'connect', 'watch']);
}