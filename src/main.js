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

    var skills = (function() {
        var skillsArr = [];
        for(var i = 0, length = SKILLS.length; i < length; i++) {
            var current = SKILLS[i];
            skillsArr.push(skill(current.name, current.relAbility));
        }
        return skillsArr;
    })();

    var getModByAbility = function(ability) {
        return ko.computed(function() {
            return _.find(abilities, function(a) {
                return a.code === ability
            }).modifier();
        });
    }

    return {
        abilities: abilities,
        skills: skills,
        getModByAbility: getModByAbility
    }
}
ko.applyBindings(sheetModel());
