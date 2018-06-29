const chai = require("chai")
const { performance } = require("perf_hooks");
const lofac = require("../Source/locFacade.js");


describe(__filename, () => {

    describe("performance", () => {

        it("loc.add", () => {
            //assign
            var loc = lofac();
            var count = 1000000;
            var avgCount = 1000;
            var avgSum = 0;
            var targetTime = 10;//ms

            //act
            var totalS = performance.now();
            for (var avg = 0; avg < avgCount; ++avg) {
                var ts = performance.now();
                for (var i = 0; i < count; ++i)
                    loc.add("key", "value", "ru-RU");
                var te = performance.now();
                avgSum += te - ts;
            }
            var totalE = performance.now();

            //assert
            var avgTime = avgSum / avgCount;
            var totalTime = totalE - totalS;
            chai.expect(avgTime).lessThan(
                targetTime,
                `${count} записей должны записываться менее чем за ${targetTime} ms. Сейчас выполняеться дольше на ${((avgTime-targetTime)/targetTime*100).toFixed(2)}%`
            );
            console.log(`count: ${count} elapsed ms: ${avgSum / avgCount} total: ${totalE - totalS}`);
        });

        it("loc()", () => {
            //assign
            var loc = lofac();
            var count = 1000000;
            var avgCount = 1000;
            var avgSum = 0;
            var readStr = "";
            var targetTime = 10;//ms

            //act

            for (var i = 0; i < count; ++i)
                loc.add("key", "value", "ru-RU");

            var totalS = performance.now();
            for (var avg = 0; avg < avgCount; ++avg) {
                var ts = performance.now();
                for (var i = 0; i < count; ++i)
                    readStr = loc("key", "ru-RU");
                var te = performance.now();
                avgSum += te - ts;
            }
            var totalE = performance.now();

            //assert
            var avgTime = avgSum / avgCount;
            var totalTime = totalE - totalS;
            chai.expect(avgTime).lessThan(
                targetTime,
                `${count} записей должны возвращаться менее чем за ${targetTime} ms. Сейчас выполняеться дольше на ${((avgTime-targetTime)/targetTime*100).toFixed(2)}%`
            );
            // console.log(`count: ${count} elapsed ms: ${avgSum / avgCount} total: ${totalTime}`);
        });

    });

})