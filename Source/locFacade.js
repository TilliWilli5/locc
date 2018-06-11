/**
 * Паттерн фасад - гарантирует удобное использование для потребителя паблик апи
 * @module
 */

const LocClass = require("./loc.js");

// var self;

function locfactory(config){
    var inst = new LocClass(config);
    // var bound = loc.bind(inst);

    // var selfInst = () => inst;
    // var self = () => bound;

    // bound.config = inst.config;
    // locBinded.context = locInst.context;
    var self = function loc(key, context){
        return inst.Translate(key, context);
    }
    
    self.setup = function(config){
        inst.Setup(config);
        return self;
    }
    
    self.context = function(context){
        inst.Context(context);
        return self;
    }
    
    self.add = function(key, context, value){
        inst.Add(key, context, value);
        return self;
    }

    self.getContext = function(){
        return inst.context;
    }
    
    Object.defineProperty(self, "config", {
        get: ()=>inst.config
    });

    // Object.defineProperty(self, "context", {
    //     get: ()=>inst.context
    // })

    return self;
}

module.exports = locfactory;