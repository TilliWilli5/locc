/**
 * Паттерн фасад - гарантирует удобное использование для потребителя паблик апи
 * @module
 */

const LocClass = require("./loc.js");

var self;

function locfactory(config){
    var inst = new LocClass(config);
    var bound = loc.bind(inst);

    var selfInst = () => inst;
    var self = () => bound;

    // bound.config = inst.config;
    // locBinded.context = locInst.context;

    return bound;
}

function loc(key, context){
    return this.Translate(key, context);
}

loc.setup = function(config){
    this.Setup(config);
    return self();
}

loc.context = function(context){
    this.Context(context);
    return self();
}

loc.add = function(key, context, value){
    this.Add(key, context, value);
    return self();
}

loc.getContext = function(){
    return this.context;
}

module.exports = locfactory;