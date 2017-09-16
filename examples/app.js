const { Herschel } = require('../build/src');

const client = new Herschel('http://localhost:8000');

const appId = '96dfa01f-6b51-4604-9619-6cb2e3c32684';
const userId = 'john.doe';

client.caniuse(userId, appId).then((caniuse) => {
    console.log('caniuse =', caniuse);
});
client.which(userId, appId).then((which) => {
    console.log('which =', which);
});
