'use strict';
const {getLinks,getBet}=require("./crawelFrame");

const hkjcUrl = 'https://bet.hkjc.com/football/getJSON.aspx?jsontype=index.aspx';
const HkjcMill = function() {
  let betdata = new Object();
  betdata.homeTeam = this.homeTeam.teamNameEN;
  betdata.awayTeam = this.awayTeam.teamNameEN;
  betdata.H = this.hadodds.H.split('@')[1];
  betdata.D = this.hadodds.D.split('@')[1];
  betdata.A = this.hadodds.A.split('@')[1];
  return betdata;
};
exports.run = async function() {
  let data = await getLinks(hkjcUrl);
  return getBet(JSON.parse(data), HkjcMill);
};

