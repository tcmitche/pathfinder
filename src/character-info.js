/**
 * @module character-info
 */
var ko = require("knockout");
var _ = require("underscore");

var RACES = require("../data/races.json");
var CLASSES = require("../data/classes.json");
var SIZES = require("../data/sizes.json");

function characterInfo() {
    var alignments = [
        "Lawful Good", "Neutral Good", "Chaotic Good",
        "Lawful Neutral", "True Neutral", "Chaotic Neutral",
        "Lawful Evil", "Neutral Evil", "Chaotic Neutral"
    ];
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
    var background = ko.observable("");

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

    var save = function() {
        return {
            character: character(),
            player: player(),
            size: size(),
            gender: gender(),
            height: height(),
            weight: weight(),
            age: age(),
            alignment: alignment(),
            deity: deity(),
            background: background(),
            languages: languages(),
            selectedClass: selectedClass(),
            selectedRace: selectedRace()
        }
    }

    var load = function(data) {
        character(data.character);
        player(data.player);
        size(data.size);
        gender(data.gender);
        height(data.height);
        weight(data.weight);
        age(data.age);
        alignment(data.alignment);
        deity(data.deity);
        background(data.background);
        languages(data.languages);
        selectedClass(data.selectedClass);
        selectedRace(data.selectedRace);
    }

    return {
        races: RACES,
        classes: CLASSES, // This should eventually be moved into the classes viewModel
        sizes: SIZES,
        alignments: alignments,
        character: character,
        player: player,
        size: size,
        gender: gender,
        height: height,
        weight: weight,
        age: age,
        alignment: alignment,
        deity: deity,
        background: background,
        languages: languages,
        selectedClass: selectedClass,
        selectedRace: selectedRace,
        selectedRaceMod: selectedRaceMod,
        save: save,
        load: load
    }
}

module.exports = characterInfo();
