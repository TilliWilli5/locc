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
            chai.assert.exists(lofac(12));
            console.log(lofac(12).config);
        });

        it("Проверить на развязанность нескольких инстансов", ()=>{
            
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