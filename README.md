# herschel

[![Build Status](https://travis-ci.org/ablator/herschel.svg?branch=master)](https://travis-ci.org/ablator/herschel)

NodeJS client library for the Ablator feature switching server. Can be used with TypeScript or JavaScript.

# Installation

Install using npm:

```
npm install --save herschel
```

# Usage

You should create a new client object pointing to your Ablator server. Then you can use the methods `which` and `caniuse` that return native Promises.

To do so, you'll need a username -- basically any string that uniquely identifies one of your users -- and the app id, which you can get from the Ablator web interface.

```js
const { Herschel } = require('herschel');

const client = new Herschel('http://ablator.space');

const appId = '96dfa01f-6b51-4604-9619-6cb2e3c32684';
const userId = 'john.doe';

client.caniuse(userId, appId).then((caniuse) => {
    console.log('caniuse =', caniuse);
    // [ 'org.app.functionality' ]
});
client.which(userId, appId).then((which) => {
    console.log('which =', which);
    // [ 'org.app.functionality.flavor' ]
});
```
