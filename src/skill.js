/**
 * Skills
 */
var ko = require("knockout");

var skill = function(name, ability, untrained) {
    var rank = ko.observable(0);
    var trained; //computed
    var misc = ko.observable(0);
    var classSkill = ko.observable(false); // boolean computed
    var canBeUntrained = ko.observable(untrained); //boolean
    var armorCheckPenalty;
    var total = ko.computed(function() {
        return Math.max(ability(), 0) +
        parseInt(rank(), 10) +
        (classSkill() && parseInt(rank(), 10) > 0 ? 3 : 0);
    });

    return {
        name: name,
        ability: ability,
        rank: rank,
        misc: misc,
        classSkill: classSkill,
        canBeUntrained: canBeUntrained,
        total: total
    }
};

module.exports = skill;
