'use strict';

let userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;

userLang = userLang.substring(0, 2);

let loadLang = null;

if (userLang === 'en') { //english
    loadLang = require('./english.json');

} else { //fallback
    loadLang = require('./english.json');
}

export function getKey(key) {
    if (!extKey(loadLang, key)) {
        if (userLang !== 'en') {
            let loadLangtemp = require('./english.json');
            if (!extKey(loadLangtemp, key)) {
                return key + ' untranslated in ' + userLang + ' and en JSON';
            } else {
                return extKey(loadLangtemp, key);
            }
        } else if (userLang === 'en') {
            return key + ' untranslated in ' + userLang + ' JSON';
        }
    } else {
        return extKey(loadLang, key);
    }
}

function extKey(obj, str) {
    str = str.replace(/\[(\w+)\]/g, '.$1'); // let's convert indexes to properties
    str = str.replace(/^\./, ''); // gets rid of leading dot

    let a = str.split('.');

    for (let i = 0, n = a.length; i < n; i++) {
        let key = a[i];

        if (key in obj) {
            obj = obj[key];
        } else {
            return null;
        }
    }
    return obj;
}

module.exports = getKey;
