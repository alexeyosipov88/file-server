const net = require("net");
const readline = require("readline");

const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const conn = net.createConnection({
  host: "localhost", // change to IP address of computer or ngrok host if tunneling
  port: 3000, // or change to the ngrok port if tunneling
});

conn.setEncoding("utf8");

const sendRequest = (line) => {
  return new Promise((res, rej) => {
    let result;
    conn.write(line);
    conn.on("data", (data) => {
      result = data;
      if(result !== 'Sorry, no such file found!') {
        res(result);
      }
    });
  })
}

rl.on("line", (line) => {
  line = line.trim();
  sendRequest(line).
  then((content) => {
        fs.writeFile('newfile.txt', content, err => {
          if (err) {
            console.error(err)
            return
          }
          console.log('COOL!')
        })
      })

});







