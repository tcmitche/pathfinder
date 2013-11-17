/**
 * Skills
 */
var ko = require("knockout");

var skill = function(name, ability) {
    var total; //computed
    var rank = ko.observable(0);
    var trained; //computed
    var misc; //computed
    var classSkill; // boolean computed
    var canBeUntrained; //boolean
    var armorCheckPenalty;

    return {
        name: name,
        ability: ability
    }
};

module.exports = skill;
