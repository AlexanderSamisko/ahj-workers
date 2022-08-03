const Blob = require('node-blob');
const fs = require('fs');

class Handler {
  constructor() {
    this.content = {
      header: 'First header',
      main:
          {
            header: 'First header',
            content: 'First content First content First content First content First content First content First content First content',
            date: 'First date',
          },
      aside:
          {
            header: 'First header',
            content: 'First content First content First content First content First content First content First content First content',
            date: 'First date',
          },
      footer: 'first footer',
    };

    this.image = fs.readFileSync('./src/img/un4.jpg');
  }
}

module.exports = {
  Handler,
};
