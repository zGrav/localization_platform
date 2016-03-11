'use strict';
import { vsprintf } from 'sprintf-js';

let userLang = navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage;

userLang = userLang.substring(0, 2);

let loadLang = null;

if (userLang === 'en') { //english
    loadLang = require('./english.json');

} else { //fallback
    loadLang = require('./english.json');
}


function getTranslatedString(key, fallback, args, lang) {
	lang = lang || userLang;

	// try to get translated string
	let lookup = extKey(getLangFile(lang), key);
	if (!lookup && lang !== 'en') {
		// try fallback to english
		lookup = extKey(getLangFile('en'), key);
	}

	if (!lookup) {
		return fallback || key + ' untranslated in ' + lang + ' and en JSON';
	}

	if (args && args.constructor === Array) {
		lookup = vsprintf(lookup, args);
	}

	return lookup;
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
