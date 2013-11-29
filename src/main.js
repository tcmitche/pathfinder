/**
 * Main file
 */
var ko = require("knockout");
require("./ko-extenders");
var _ = require("underscore");

var ability = require("./ability");
var skill = require("./skill");
var characterInfo = require("./character-info");

var SKILLS = require("../data/skills.json");

var sheetModel = function() {
    var abilities = [
        ability("STR", 9, characterInfo.selectedRaceMod),
        ability("DEX", 14, characterInfo.selectedRaceMod),
        ability("CON", 9, characterInfo.selectedRaceMod),
        ability("INT", 12, characterInfo.selectedRaceMod),
        ability("WIS", 10, characterInfo.selectedRaceMod),
        ability("CHA", 11, characterInfo.selectedRaceMod)
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

    characterInfo.selectedClass.subscribe(function() {
        if (!characterInfo.selectedClass()) { return ""; }
        for (var classIndex = 0; classIndex < characterInfo.classes.length; classIndex++) {
            if (characterInfo.classes[classIndex].name === characterInfo.selectedClass()) {
                break;
            }
        }
        _.each(SKILLS, function(elem, index) {
            if (elem.classMap[classIndex] === true) {
                skills[index].classSkill(true);
            } else {
                skills[index].classSkill(false);
            }
        });
    });

    var saveSheet = function() {
        var sheetData = {
            characterInfo: characterInfo.save(),
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
        characterInfo.load(sheetData.characterInfo);
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
        characterInfo: characterInfo,
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
