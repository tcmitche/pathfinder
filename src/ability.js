/**
 * Ability Module
 */
var ko = require("knockout");
var _ = require("underscore");

var friendlyName = function(code) {
    var names = {
        STR: "Strength",
        DEX: "Dexterity",
        CON: "Constitution",
        INT: "Intelligence",
        WIS: "Wisdom",
        CHA: "Charisma"
    }
    return names[code];
}

var ability = function(code, base, enhance, misc, temp) {
    // I hate this, must fix later
    base = _.isNumber(base) ? base : 0;
    enhance = _.isNumber(enhance) ? enhance : 0;
    misc = _.isNumber(misc) ? misc : 0;
    temp = _.isNumber(temp) ? temp : 0;
    
    base = ko.observable(base).extend({ integer: null });
    enhance = ko.observable(enhance).extend({ integer: null });
    misc = ko.observable(misc).extend({ integer: null });
    temp = ko.observable(temp).extend({ integer: null });

    // todo: extend for ints
    var score = ko.computed(function() {
        return base() + enhance() + misc() + temp();
    });

    var modifier = ko.computed(function() {
        return Math.floor((score() - 10) / 2);
    });

    return {
        name: friendlyName(code),
        code: code,
        base: base,
        enhance: enhance,
        misc: misc,
        temp: temp,
        modifier: modifier,
        score: score,
    }
}

module.exports = ability;
