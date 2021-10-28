const net = require('net');

const fs = require('fs')


const server = net.createServer((c) => {
  console.log('client connected');
  c.on('end', () => {
    console.log('client disconnected');
  });
})

server.on('error', (err) => {
  throw err;
})
server.on('connection', (client) => {
  
  client.setEncoding('utf8');
  client.on('data', (filename) => {
    console.log('The following file was requested:', filename);
    fs.readFile(`${filename}`, 'utf8' , (err, data) => {
      if (err) {
        console.log(err)
        client.write(`Sorry, no such file found!`);
      } else {
        console.log('COOL', data)
        client.write(data);
      }
    })


  });


})

server.listen(3000, () => {
  console.log('server bound');

});