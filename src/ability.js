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

var ability = function(code, base, racialMod, enhance, misc, temp) {
    // I hate this, must fix later
    base = _(base).isNumber() ? base : 0;
    enhance = _(enhance).isNumber() ? enhance : 0;
    misc = _(misc).isNumber() ? misc : 0;
    temp = _(temp).isNumber() ? temp : 0;
    
    base = ko.observable(base).extend({ integer: null });
    var racialValue = ko.observable(0).extend({ integer: null });
    // Todo: it would be nice if there was an alert if a score was missing from the ability total
    racial = ko.computed(function() {
        if (_(racialMod().ANY).isNumber()) {
            racialValue(0);
            return "(" + racialMod().ANY + ")";
        } else if (_(racialMod()[code]).isNumber()) {
            racialValue(racialMod()[code])
            return racialMod()[code];
        } else {
            racialValue(0);
            return 0;
        }
        return racialMod()[code] || 0; // There's a special case for 'ANY' here (e.g. Humans)
    });
    enhance = ko.observable(enhance).extend({ integer: null });
    misc = ko.observable(misc).extend({ integer: null });
    temp = ko.observable(temp).extend({ integer: null });

    // todo: extend for ints
    var score = ko.computed(function() {
        return base() + racialValue() + enhance() + misc() + temp();
    });

    var modifier = ko.computed(function() {
        return Math.floor((score() - 10) / 2);
    });

    var save = function() {
        return {
            code: code,
            base: base(),
            enhance: enhance(),
            misc: misc(),
            temp: temp()
        };
    };

    var load = function(saved) {
        base(saved.base);
        enhance(saved.enhance);
        misc(saved.misc);
        temp(saved.temp);
    }

    return {
        name: friendlyName(code),
        code: code,
        base: base,
        racial: racial,
        enhance: enhance,
        misc: misc,
        temp: temp,
        modifier: modifier,
        score: score,
        save: save,
        load: load
    }
}

module.exports = ability;
