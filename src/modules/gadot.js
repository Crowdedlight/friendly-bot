'use strict';

const Module = require('../module');
const request = require('request');

class Gadot extends Module {

    trigger(){
        return "gadot";
    }

    help(){
        return "Random Gal Gadot from imgur. \n" +
            "\n\n" +
            "Available commands:\n" +
            "!gadot \t Get a random Gal Gadot image";
    }

    restrictedChannel() {
        return true;
    }

    handle(message){
        request('https://imgur.com/r/GalGadot/hot.json', (error, response, body) => {

            if(!error && response.statusCode == 200) {
                var msg;
                var data = JSON.parse(body)['data'];

                var object = data[Math.floor(Math.random()*data.length)];

                msg = `http://imgur.com/${object.hash}${object.ext.replace(/\?.*/, '')}`;

            } else {
                msg = "Something went wrong. Best ping @Crow LightBringer#7621";
            }

            message.channel.send(msg);
        });
    }
}

module.exports = function(bot) {
    new Gadot(bot);
};