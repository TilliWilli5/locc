/**
 * Паттерн фасад - гарантирует удобное использование для потребителя паблик апи
 * @module
 */

const LocClass = require("./loc.js");

const inst = Symbol("inst");

function locfactory(config){

    return loc.bind(new LocClass(config));
    
}

function loc(key, context){
    return this.Translate(key, context);
}

loc.setup = function(config){
    this.Setup(config);
    return loc;
}

loc.context = function(context){
    this.Context(context);
    return loc;
}

loc.add = function(key, context, value){
    this.Add(key, context, value);
    return loc;
}

Object.defineProperty(loc, "config", {
    get: () => { this.config }
});


module.exports = locfactory;