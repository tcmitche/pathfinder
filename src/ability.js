/**
 * Ability Module
 */
var ko = require("knockout");

var ability = function(name, code) {
    var base = ko.observable(0);
    var enhance = ko.observable(0);
    var misc = ko.observable(0);
    var temp = ko.observable(0);

    // todo: extend for ints
    var score = ko.computed(function() {
        return parseInt(base(), 10) +
            parseInt(enhance(), 10) +
            parseInt(misc(), 10) +
            parseInt(temp(), 10);
    });

    var modifier = ko.computed(function() {
        return Math.floor((score() - 10) / 2);
    });

    return {
        name: name,
        code: code,
        base: base,
        enhance: enhance,
        misc: misc,
        temp: temp,
        modifier: modifier,
        score: score
    }
}

module.exports = ability;
