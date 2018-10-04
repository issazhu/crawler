'use strict';
const { getLinks, getBet_Cheerio,mixBetData } = require('../crawelFrame');

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

exports.run = async function() {
  let configData = await getLinks(macauslotConfigUrl);
  let data = await getLinks(macauslotUrl);
  let configObj = getBet_Cheerio(configData, configMill, 'Fixture');
  let bet = getBet_Cheerio(data, macauslotMill, 'Fixture');
  return mixBetData(configObj, bet);
};

