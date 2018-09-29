'use strict';
const suite = new (require('benchmark')).Suite();
const { getLinks, getBet_Cheerio } = require('./../crawelFrame');

var macauslotConfigUrl =
  'https://web.macauslot.com/content/data/soccer/xml/odds/odds_config.xml';
var macauslotUrl =
  'https://web.macauslot.com/content/data/soccer/xml/odds/odds.xml';

var configMill = function() {
  let betData = new Object();
  betData.id = this.attr('id');
  betData.homeTeam = this.attr('eh');
  betData.awayTeam = this.attr('ea');
  return betData;
};
var macauslotMill = function() {
  let betData = new Object();
  betData.id = this.attr('id');
  betData.H = this.attr('wh');
  betData.D = this.attr('wd');
  betData.A = this.attr('wa');
  return betData;
};

var mixBetData = function(obj1, obj2) {
  let arr1 = Object.keys(obj1).map(function(value) {
    return obj1[value].id;
  });
  let arr2 = Object.keys(obj1).map(function(value) {
    return obj2[value].id;
  });
  return arr1.forEach(function(value, index) {
      let val1=arr2.indexOf(value);
      let val2=obj2[val1];
    Object.assign(obj1[index], val2);
  });
  //console.log(obj1);
};
var mixBetData2 = function(obj1, obj2) {
    let arr2 = Object.keys(obj1).map(function(value) {
      return obj2[value].id;
    });
    Object.keys(obj1).forEach(function(value, index) {
       Object.assign(obj1[index], obj2[arr2.indexOf(obj1[value].id)]);
    });
    return obj1;
  };
const run = async function() {
  let configData = await getLinks(macauslotConfigUrl);
  let data = await getLinks(macauslotUrl);
  let configObj = getBet_Cheerio(configData, configMill, 'Fixture');
  let bet = getBet_Cheerio(data, macauslotMill, 'Fixture');
  suite
    .add('mixBetData', function() {
      mixBetData(configObj, bet);
    })
    .add('mixBetData2', function() {
      mixBetData2(configObj, bet);
    })
    .on('complete', function() {
      console.log('result:');
      this.forEach(function(result) {
        console.log(result.name, result.count, result.times.elapsed);
      });
    })
    .run();
};
run();
