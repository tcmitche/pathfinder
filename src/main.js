/**
 * Main file
 */
var ko = require("knockout");
require("./ko-extenders");
var _ = require("underscore");

var ability = require("./ability");
var skill = require("./skill");

var SKILLS = require("../data/skills.json");
var RACES = require("../data/races.json");
var CLASSES = require("../data/classes.json");

var sheetModel = function() {
    var selectedRace = ko.observable();
    var selectedRaceMod = ko.computed({
        read: function() {
            if (!selectedRace()) { return {}; }
            return _.find(RACES, function(race) {
                return race.name === selectedRace();
            }).abilityMod;
        },
        write: function(value) {
            selectedRace(value);
        }
    });

    var abilities = [
        ability("STR", 9, selectedRaceMod),
        ability("DEX", 14, selectedRaceMod),
        ability("CON", 9, selectedRaceMod),
        ability("INT", 12, selectedRaceMod),
        ability("WIS", 10, selectedRaceMod),
        ability("CHA", 11, selectedRaceMod)
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

    var selectedClass = ko.observable();
    var selectedClassIndex = ko.computed(function() {
        if (!selectedClass()) { return ""; }
        for (var classIndex = 0; classIndex < CLASSES.length; classIndex++) {
            if (CLASSES[classIndex].name === selectedClass()) {
                break;
            }
        }
        console.log(classIndex)
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
        races: RACES,
        classes: CLASSES,
        selectedRace: selectedRace,
        selectedClass: selectedClass,
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
