const alias = require('module-alias');
alias.addAliases({
    '@': __dirname + '/../src'
});

require('./authentication');
require('./api');
