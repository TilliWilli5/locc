const store = Symbol("store");

class Storage
{
    constructor(){
        this[store] = {};
    }

    Put(key, context, value) {
        if (!context)
            return { error: new Error(`[Storage](invalid context):${context}`) };
        if (!key)
            return { error: new Error(`[Storage](invalid key):${key}`) };
        if (typeof value !== "string")
            return { error: new Error(`[Storage](invalid value):${value}`) };

        //инициализируем если небыло такого контекста еще
        if(!this[store][context])
            this[store][context] = {};
        
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