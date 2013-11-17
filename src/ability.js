/**
 * Ability Module
 */
var ko = require("knockout");

var ability = function(name, code) {
    var base = ko.observable(0).extend({ integer: null });
    var enhance = ko.observable(0).extend({ integer: null });
    var misc = ko.observable(0).extend({ integer: null });
    var temp = ko.observable(0).extend({ integer: null });

    // todo: extend for ints
    var score = ko.computed(function() {
        return base() + enhance() + misc() + temp();
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
