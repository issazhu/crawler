'use strict'
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
var hkjcUrl = 'https://bet.hkjc.com/football/getJSON.aspx?jsontype=index.aspx';
var getLinks = (url) => {
    return new Promise(function (resolve, reject) {
        request
            .get(url)
            .charset('utf8')
            .end((err, res) => {
                resolve(JSON.parse(res.text));
            });
    });
}
var jsonHkjcGet = (data) => {
    let ans = {};
    for (let i = 0; i < data.length; i++) {
        let obj = {
            homeTeam: data[i].homeTeam.teamNameEN,
            awayTeam: data[i].awayTeam.teamNameEN,
            H: data[i].hadodds.H,
            D: data[i].hadodds.D,
            A: data[i].hadodds.A
        }
        ans[i.toString()] = obj;
    }
    //console.log(ans);
    return ans;
}
var show = (text) => {
    // var hkjcjson = JSON.parse(text);
    console.log(text);
}
getLinks(hkjcUrl)
    .then((data) => {
        return jsonHkjcGet(data);
    })
    .then((data) => {
        show(data);
    });
