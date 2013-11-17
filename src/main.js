/**
 * Main file
 */
var ko = require("knockout");
require("./ko-extenders");
var _ = require("underscore");

var ability = require("./ability");
var skill = require("./skill");

var SKILLS = require("../data/skills.json");

var sheetModel = function() {
    // need a way to get scores by type
    var abilities = [
        ability("STR", 9),
        ability("DEX", 14),
        ability("CON", 9),
        ability("INT", 12),
        ability("WIS", 10),
        ability("CHA", 11)
    ];

    var getModByAbility = function(ability) {
        return ko.computed(function() {
            return _.find(abilities, function(a) {
                return a.code === ability
            }).modifier();
        });
    }

    var saveSheet = function() {
        var sheetData = {};

    };

    var skills = _.map(SKILLS, function(s) {
        return skill(
            s.name,
            getModByAbility(s.relAbility),
            s.canUseUntrained,
            s.armorPenalty
        )
    });

    return {
        abilities: abilities,
        skills: skills,
        saveSheet: saveSheet
    }
}
ko.applyBindings(sheetModel());
