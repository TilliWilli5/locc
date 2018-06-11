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

