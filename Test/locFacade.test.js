const chai = require("chai")
const lofac = require("../Source/locFacade.js");

const subject = __dirname + __filename;


describe(subject, ()=>{

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

    describe("loc.setup", ()=>{

        /* it("positive test", ()=>{
            //assign
            var config = {};
    
            //act
            loc.setup(config);
    
            //assert
        });

        it("negative test", ()=>{
            //assign
            var config = null;
    
            //act
            loc.setup(config);
    
            //assert
            chai.assert.exists(loc.config);
        }); */

        
    });
    

})