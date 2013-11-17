/**
 * Skills
 */
var ko = require("knockout");

var skill = function(name, usableUntrained, armorCheck, abilityMod) {
    var rank = ko.observable(0).extend({ integer: null });
    var racial = ko.observable(0).extend({ integer: null }); // computed eventually
    var misc = ko.observable(0).extend({ integer: null });
    var classSkill = ko.observable(false); // boolean computed
    var canBeUntrained = ko.observable(usableUntrained); //boolean
    var armorCheckPenalty = ko.observable(armorCheck);
    var total = ko.computed(function() {
        return rank() +
        abilityMod() +
        racial() +
        misc() +
        (classSkill() && rank() > 0 ? 3 : 0);
    });

    var save = function() {
        return {
            name: name,
            rank: rank(),
            racial: racial(),
            misc: misc()
        }
    };

    var load = function(saved) {
        rank(saved.rank);
        racial(saved.racial);
        misc(saved.misc);
    };

    return {
        name: name,
        abilityMod: abilityMod,
        rank: rank,
        racial: racial,
        misc: misc,
        classSkill: classSkill,
        canBeUntrained: canBeUntrained,
        armorCheckPenalty: armorCheckPenalty,
        total: total,
        save: save,
        load: load
    }
};

module.exports = skill;
