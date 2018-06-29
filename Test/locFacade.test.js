const chai = require("chai")
const lofac = require("../Source/locFacade.js");

describe(__filename, ()=>{

    describe("locfactory", ()=>{

        it("should accept different config object", ()=>{
            //assign
            //act
            //assert
            chai.assert.exists(lofac());
            chai.assert.exists(lofac(null));
            chai.assert.exists(lofac({}));
            chai.assert.exists(lofac(""));
            chai.assert.exists(lofac("t")); 
            chai.assert.exists(lofac(12));
        });

        it("every instance should has separate context", ()=>{
            //assign
            var loc1 = lofac().context("ru");
            var loc2 = lofac().context("en");
            //act
            //assert
            chai.assert.notEqual( loc1.getContext(), loc2.getContext() );
        });

        it("every instance should has separate config", ()=>{
            //assign
            var loc1 = lofac({strictMode: true});
            var loc2 = lofac({strictMode: false});
            lofac({strictMode: "shared"})//пробуем переписать общее состояние двух предыдущих
            //act
            //assert
            chai.assert.notDeepEqual(loc1.config, loc2.config);

        });

        it("every instance should has separate storage", ()=>{
            //assign
            var loc1 = lofac({context: "ru"}).add("ShowMeLabel", "Показать");
            var loc2 = lofac({context: "ru"}).add("ShowMeLabel", "Show");
            //act
            //assert
            chai.assert.notEqual(loc1("ShowMeLabel"), loc2("ShowMeLabel"));

        });

        it("should be chainable", ()=>{
            //assign
            var loc = lofac();
            var locAfterSetup = loc.setup({strictMode:true});
            var locAfterContext = loc.context("ru");
            var locAfterAdd = loc.setup("ShowMeLabel");
            //act
            //assert
            chai.assert.strictEqual(loc, locAfterSetup);
            chai.assert.strictEqual(locAfterSetup, locAfterContext);
            chai.assert.strictEqual(locAfterContext, locAfterAdd);
        });
    });

    describe("loc.add", ()=>{

        it("should throw error if initial context doenst specified", ()=>{
            //assign
            var loc = lofac();
            //act
            //assert
            chai.expect(()=>{
                loc.add("ShowMeLabel", "Show");
            }).to.throw();
        });

    });

    describe("loc", ()=>{

        it("should doesn't have keys from Object.prototype", ()=>{
            //assign
            var loc = lofac();
            var locStrict = lofac({strictMode:true});

            //act
            loc.add("label", "text", "ctx");
            locStrict.add("label", "text", "ctx");

            //assert
            chai.assert.isString(loc("hasOwnProperty", "ctx"));
            chai.expect(()=>{
                locStrict("hasOwnProperty", "ctx")
            }).to.throw();// assert.isUndefined();
        });
    });

    describe("loc.setup", ()=>{

        it("should accept different config object", ()=>{
            //assign
            //act
            var loc1 = lofac().setup();
            var loc2 = lofac().setup(null);
            var loc3 = lofac().setup({});
            var loc4 = lofac().setup("");
            var loc5 = lofac().setup("t");
            var loc6 = lofac().setup(12);
            var loc7 = lofac().setup({strictMode: true, "prop1": null});
            
            //assert
            chai.assert.exists(loc1.config);
            chai.assert.exists(loc2.config);
            chai.assert.exists(loc3.config);
            chai.assert.exists(loc4.config);
            chai.assert.exists(loc5.config);
            chai.assert.exists(loc6.config);
            chai.assert.exists(loc7.config);

            chai.assert.equal(loc7.config.strictMode, true);
            chai.assert.equal(loc7.config.prop1, null);
        });

    });

    describe("loc.dictionary", ()=>{
        it("should return dictionary", ()=>{
            //assign
            var loc1 = lofac();

            //act
            loc1.add("ShowMeLabel", "Показать", "ru_RU");
            loc1.add("ShowMeLabel", "Show", "en_EN");
            
            loc1.context("en_EN");
            loc1.add("LinkLabel", "Link");
            loc1.add("ButtonLabel", "Button");
            loc1.add("ImageLabel", "Image");

            loc1.context("ru_RU");
            loc1.add("LinkLabel", "Ссылка");
            loc1.add("ButtonLabel", "Кнопка");
            loc1.add("ImageLabel", "Изображение");

            var dict = loc1.dictionary;
            
            //assert
            chai.assert.exists(dict);
            chai.assert.equal(dict["ru_RU"]["ShowMeLabel"], "Показать");
            chai.assert.equal(dict["en_EN"]["ButtonLabel"], "Button");
            chai.assert.equal(dict["ru_RU"]["ImageLabel"], "Изображение");
        });

    });
    
})