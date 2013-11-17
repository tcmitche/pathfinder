module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            dev: {
                files: {
                    "build/<%= pkg.name %>.js": ["src/main.js"]
                }
            }
        },
        watch: {
            dev: {
                files: ["src/**/*.js", "assets/**/*", "data/**/*"],
                tasks: ["clear", "default"]
            },
            less: {
                files: ["assets/**/*"],
                tasks: ["clear", "less:dev"]
            }
        },
        less: {
            dev: {
                options: {
                    paths: ["assets/less"]
                },
                files: {
                    "build/<%= pkg.name %>.css": "assets/less/main.less"
                }
            }
        },
        clean: ["build/"]
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", ["clean", "browserify:dev", "less:dev"]);
};
