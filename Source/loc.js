const Storage = require("./locStorage.js");

const ctx = Symbol("ctx");
const cfg = Symbol("cfg");
const store = Symbol("store");
const shadowStore = Symbol("shadowStore");

const shadowContext = "shadowContext";
const shadowKey = "";

const defaultConfig = {
    strictMode: false,
};

class Loc
{
    constructor(config) {
        this[cfg] = this._MergeConfigs(defaultConfig, config);
        this[ctx] = config && config.context || defaultConfig.context;
        this[store] = new Storage(config.dict);

        if(this[cfg].shadowingMode)
            this[shadowStore] = new Storage();
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
                ? result.value
                : fallbackResult;
    }

    _MergeConfigs(config, overrideConfig){
        return Object.assign({}, config, overrideConfig);
    }


    //PUBLIC
    Add(key, context, value) {
        if(this.isShadowMode)
        {
            this[shadowStore].Add(key, shadowContext, shadowKey);
            return;
        }
        context = context || this[ctx];
        var result = this[store].Put(key, context, value);
        if(!result.success)
            throw result.error;
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
            return { error: new Error(`[Loc](invalid config):${config}`) };
        this[cfg] = this._MergeConfigs(this[cfg], config);
    }

    get config(){
        return this[cfg];
    }

    get context(){
        return this[ctx];
    }

    get dictionary(){
        return this[store].Snapshot();
    }

    get shadowDictionary(){
        return this[shadowStore].shadowContext;
    }

    get isShadowMode(){
        return this[cfg].shadowingMode;
    }
}


module.exports = Loc;