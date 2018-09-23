'use strict'
const charset = require('superagent-charset');
const request = require('superagent');
const cheerio = require('cheerio');
charset(request);
var macauslotConfigUrl = 'https://web.macauslot.com/content/data/soccer/xml/odds/odds_config.xml';
var macauslotUrl = 'https://web.macauslot.com/content/data/soccer/xml/odds/odds.xml';

var getLinks = (url) => {
    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .charset('utf8')
            .end((err, res) => {
                resolve(res.text);
            });
    });
}
var jsonMacauslotConfigGet = (ans, data) => {

    const $ = cheerio.load(data);
    $('Fixture').map((i, elem) => {
        //console.log($(elem).attr('id'),$(elem).attr('eh'),$(elem).attr('ea'));
        var obj = {
            homeTeam: $(elem).attr('eh'),
            awayTeam: $(elem).attr('ea'),
        }
        ans[$(elem).attr('id')] = obj;
    });

    //console.log(ans);
    return ans;
}
var jsonMacauslotGet = (ans, data) => {
    const $ = cheerio.load(data);
    $('Fixture').map((i, elem) => {
        var obj = {
            H: $(elem).attr('wh'),
            D: $(elem).attr('wd'),
            A: $(elem).attr('wa'),
        }
        Object.assign(ans[$(elem).attr('id')], obj);
    });
    return ans;
}
var show = (data) => {
    console.log(data);
}

Promise.all([getLinks(macauslotConfigUrl), getLinks(macauslotUrl)])
    .then((res) => {
        var ans = {};
        ans = jsonMacauslotConfigGet(ans, res[0]);
        //console.log(ans);
        return jsonMacauslotGet(ans, res[1]);
    })
    .then((res) => {
        show(res);
    })