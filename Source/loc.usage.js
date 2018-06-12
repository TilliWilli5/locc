const loc = require("./loc.js");

var ruCtx = "ru-RU";
var enCtx = "ru-RU";
loc.context(ruCtx);

var ruString = loc("ShowMeLabel");
var enString = loc("ShowMeLabel", enCtx);

console.log(ruString);//Показать
console.log(enString);//Show

//---------------------------------
loc.add("HideMeLabel", "Скрыть","ru-RU");
loc.add("HideMeLabel", "Hide", "en-En");

loc.context("labelName");
loc.add("HideMeLabel", "HideMeLabel");

console.log(loc("HideMeLabel", "ru-RU"));//Скрыть
console.log(loc("HideMeLabel", "en-EN"));//Hide
loc.context("labelName");
console.log(loc("HideMeLabel"));//HideMeLabel
//---------------------------------
var locConfig = {
    strictMode: true,
    context: "awesomeContext"
};
loc.setup(locConfig);

console.log(loc("NonExistsLabelName"));//throw new Error
console.log(loc("ShowMeLabel", "NonExistsContext"));//throw new Error

loc.setup({ strictMode: false });

console.log(loc("NonExistsLabelName"));//return string: "[NonExistsLabelName:awesomeContext]", where awesomeContext - is current context
console.log(loc("ShowMeLabel", "NonExistsContext"));//return string: "[NonExistsLabelName:awesomeContext]"
//---------------------------------
var loc = lofac({
    shadowingMode: true
});

loc("Label1");
loc("Label2");
loc("Button1");
loc("Title1");

var dict = loc.shadowDictionary;//здесь мы получим список всех необходимых переводов
/*
{
    "shadowContext":{
        Label1: "",
        Label2: "",
        Button1: "",
        Title1: "",
    }
}
*/
//---------------------------------
