module.exports = function(grunt) {
    grunt.registerTask('clear', 'Clears the screen', function() {
        grunt.log.write('\033[H\033[2J');
    });
};
