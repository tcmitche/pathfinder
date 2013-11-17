/**
 * Ability Module
 */
var ko = require("knockout");

var ability = function(name, code) {
    var score = ko.observable(0);

    var modifier = ko.computed(function() {
        return Math.floor((score() - 10) / 2);
    });

    return {
        name: name,
        code: code,
        score: score,
        modifier: modifier
    }
}

module.exports = ability;
