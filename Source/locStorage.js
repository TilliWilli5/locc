const store = Symbol("store");

class Storage
{
    constructor(dict){
        this[store] = this._EmptyDict();
        if (dict)
            this._InitDict(dict);
    }

    //PRIVATE
    _InitDict(dict){
        var self = this;
        Object.keys(dict).forEach(context => {
            self[store][context] = self._EmptyDict();
            Object.keys(dict[context]).forEach(key => {
                self[store][context][key] = dict[context][key];
            });
        });
    }

    _EmptyDict(){
        return Object.create(null);
    }

    //PUBLIC
    Put(key, context, value) {
        if (!context)
            return { error: new Error(`[Storage](invalid context):${context}`) };
        if (!key)
            return { error: new Error(`[Storage](invalid key):${key}`) };
        if (typeof value !== "string")
            return { error: new Error(`[Storage](invalid value):${value}`) };

        //инициализируем если небыло такого контекста еще
        if(!this[store][context])
            this[store][context] = this._EmptyDict();
        
        //сохраняем значение
        this[store][context][key] = value;
        
        return { success: true };
    }

    Load(key, context) {
        if (!this[store][context])
            return { error: new Error(`[Storage](context doesn't exist):${context}`) };
        if (!this[store][context][key])
            return { error: new Error(`[Storage](key doesn't exist):${key}`) };
        return { value: this[store][context][key], success: true };
    }

    Snapshot(){
        return this[store];
    }
}

module.exports = Storage;