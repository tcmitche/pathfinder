/**
 * Main file
 */
var ko = require("knockout");
var ability = require("./ability");

var sheetModel = function() {
    var abilities = [
        ability("Strength", "STR"),
        ability("Dexterity", "DEX"),
        ability("Constitution", "CON"),
        ability("Intelligence", "INT"),
        ability("Wisdom", "WIS"),
        ability("Charisma", "CHA")
    ];

    return {
        abilities: abilities
    }
}
ko.applyBindings(sheetModel());
