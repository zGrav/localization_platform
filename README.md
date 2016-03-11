# localization_platform
A minimalistic way of getting translation keys from a JSON file

# HOWTO

let getKey = require('../../locales/getkey');

getKey('test.english.var')

Fallback method: getKey('test.english.var2', 'hi i am a fallback key when key not found')

# EXTRA

I recommend the usage of sprintf.js with this platform (https://github.com/alexei/sprintf.js), I use the vsprintf function for easier handling.

# TODO
Update README with rest of functions.
