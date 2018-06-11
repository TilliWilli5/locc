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
            //act
            //assert
            chai.assert.notDeepEqual(
                lofac().context("ru").getContext(),
                lofac().context("en").getContext(),
            );
        });

        it("every instance should has separate config", ()=>{
            //assign
            //act
            //assert
            chai.assert.notDeepEqual(
                lofac({strictMode: true}).config,
                lofac({strictMode: false}).config
            );

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