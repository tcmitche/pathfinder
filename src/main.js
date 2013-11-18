/**
 * Main file
 */
var ko = require("knockout");
require("./ko-extenders");
var _ = require("underscore");

var ability = require("./ability");
var skill = require("./skill");

var SKILLS = require("../data/skills.json");
var races = require("../data/races.json");

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

    var skills = _.map(SKILLS, function(s) {
        return skill(
            s.name,
            s.canUseUntrained,
            s.armorPenalty,
            getModByAbility(s.relAbility)
        )
    });

    var saveSheet = function() {
        var sheetData = {
            abilities: _.map(abilities, function(ability) { return ability.save(); }),
            skills: _.map(skills, function(skill) { return skill.save(); })
        }
        localStorage.characterSheetData = JSON.stringify(sheetData);
    };

    var loadSheet = function() {
        var sheetData = localStorage.characterSheetData;
        if (sheetData) {
            sheetData = JSON.parse(sheetData);
        } else {
            return;
        }
        _.each(sheetData.abilities, function(ability) {
            _.find(abilities, function(a) {
                return a.code === ability.code;
            }).load(ability);
        });
        _.each(sheetData.skills, function(skill) {
            _.find(skills, function(s) {
                return s.name === skill.name;
            }).load(skill);
        });
    }

    return {
        abilities: abilities,
        skills: skills,
        races: races,
        saveSheet: saveSheet,
        loadSheet: loadSheet
    }
}

ko.applyBindings(sheetModel());

// Select all text in inputs when clicking them.
document.body.addEventListener("click", function(event) {
    if (event.target.nodeName === "INPUT") {
        event.target.select();
    };
}, false);
