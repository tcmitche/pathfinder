/**
 * Main file
 */
var ko = require("knockout");
var _ = require("underscore");
var ability = require("./ability");
var skill = require("./skill");

var SKILLS = require("../data/skills.json");

var sheetModel = function() {
    // need a way to get scores by type
    var abilities = [
        ability("Strength", "STR"),
        ability("Dexterity", "DEX"),
        ability("Constitution", "CON"),
        ability("Intelligence", "INT"),
        ability("Wisdom", "WIS"),
        ability("Charisma", "CHA")
    ];

    var getModByAbility = function(ability) {
        return ko.computed(function() {
            return _.find(abilities, function(a) {
                return a.code === ability
            }).modifier();
        });
    }

    var skills = (function() {
        var skillsArr = [];
        for(var i = 0, length = SKILLS.length; i < length; i++) {
            var current = SKILLS[i];
            skillsArr.push(skill(current.name, getModByAbility(current.relAbility), current.canUseUntrained));
        }
        return skillsArr;
    })();

    return {
        abilities: abilities,
        skills: skills
    }
}
ko.applyBindings(sheetModel());
