/**
 * @module character-info
 */
var ko = require("knockout");
var _ = require("underscore");

var RACES = require("../data/races.json");
var CLASSES = require("../data/classes.json");
var SIZES = require("../data/sizes.json");

function characterInfo() {
    /**
     * The character name
     */
    var character = ko.observable("");
    /**
     * The player name
     */
    var player = ko.observable("");

    var size = ko.observable("");// Some sizes defined in an array
    var gender = ko.observable("");// Male or female
    var height = ko.observable("");
    var weight = ko.observable("");// Should this be a number?

    var age = ko.observable(0);
    var alignment = ko.observable("");// Should display the alignment grid
    var deity = ko.observable("");
    var backgroundInfo = ko.observable("");

    var languages = ko.observable("");

    var selectedClass = ko.observable();
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


    return {
        races: RACES,
        classes: CLASSES, // This should eventually be moved into the classes viewModel
        sizes: SIZES,
        character: character,
        player: player,
        size: size,
        gender: gender,
        height: height,
        weight: weight,
        age: age,
        alignment: alignment,
        deity: deity,
        backgroundInfo: backgroundInfo,
        languages: languages,
        selectedClass: selectedClass,
        selectedRace: selectedRace,
        selectedRaceMod: selectedRaceMod
    }
}

module.exports = characterInfo();
