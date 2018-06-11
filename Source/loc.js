const Storage = require("./locStorage.js");

const ctx = Symbol("ctx");
const cfg = Symbol("cfg");
const store = Symbol("store");

const defaultConfig = {
    strictMode: false,
};

class Loc
{
    constructor(config) {
        this[cfg] = this._MergeConfigs(defaultConfig, config);
        this[store] = new Storage();
    }

    //PRIVATE
    _Result(result, fallbackResult) {
        if(this[cfg].strictMode)
            if(result.success)
                return result.value;
            else
                throw result.error;
        else
            return result.success
                ? result.success
                : fallbackResult;
    }

    _MergeConfigs(config, overrideConfig){
        return Object.assign({}, config, overrideConfig);
    }


    //PUBLIC
    Add(key, context, value) {
        context = context || this[ctx];
        var result = this[store].Put(key, context, value);
        return this._Result(result);
    }

    Translate(key, context) {
        context = context || this[ctx];
        var result = this[store].Load(key, context);
        return this._Result(result, `[${key}:${context}]`);
    }

    Context(context) {
        if (!context)
            return { error: new Error(`[Loc](invalid context):${context}`) };
        this[ctx] = context;
    }

    Setup(config) {
        if (!config)
            return { error: new Error(`[Loc](invalid context):${config}`) };
        this[cfg] = this._MergeConfigs(this[cfg], config);
    }

    get config(){
        return this[cfg];
    }

    get context(){
        return this[ctx];
    }
}


module.exports = Loc;