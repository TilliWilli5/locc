/**
 * Паттерн фасад - гарантирует удобное использование для потребителя паблик апи
 * @module
 */

const LocClass = require("./loc.js");

/** Factory class for instance of LocClass */
function locfactory(config){

    var inst = new LocClass(config);
    
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
    
    /**
     * Добавить один перевод в словарь
     * @param {String} key ключ
     * @param {String} value значение
     * @param {String} context текущий язык
     */
    self.add = function(key, value, context){
        inst.Add(key, context, value);
        return self;
    }

    self.getContext = function(){
        return inst.context;
    }
    
    Object.defineProperty(self, "config", {
        get: ()=>inst.config
    });

    Object.defineProperty(self, "dictionary", {
        get: ()=>inst.dictionary
    });

    Object.defineProperty(self, "shadowDictionary", {
        get: ()=>inst.shadowDictionary
    });

    return self;
}

module.exports = locfactory;