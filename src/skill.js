/**
 * Skills
 */
var ko = require("knockout");

var skill = function(name, abilityMod, untrained, armorCheck) {
    var rank = ko.observable(0).extend({ integer: null });
    var racial = ko.observable(0).extend({ integer: null }); // computed eventually
    var misc = ko.observable(0).extend({ integer: null });
    var classSkill = ko.observable(false); // boolean computed
    var canBeUntrained = ko.observable(untrained); //boolean
    var armorCheckPenalty = ko.observable(armorCheck);
    var total = ko.computed(function() {
        return rank() +
        abilityMod() +
        racial() +
        misc() +
        (classSkill() && rank() > 0 ? 3 : 0);
    });

    return {
        name: name,
        abilityMod: abilityMod,
        rank: rank,
        racial: racial,
        misc: misc,
        classSkill: classSkill,
        canBeUntrained: canBeUntrained,
        armorCheckPenalty: armorCheckPenalty,
        total: total
    }
};

module.exports = skill;
