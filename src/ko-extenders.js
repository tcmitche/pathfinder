/**
 * KO extenders
 */
var ko = require("knockout");

ko.extenders.integer = function(target, option) {
    return ko.computed({
        read: function() {
            return parseInt(target(), 10);
        },
        write: function(value) {
            target(value);
        }
    });
};
