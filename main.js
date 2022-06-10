const shell = require('shelljs')
//We gotta inject some request
const path = require('path')
const speech = require('@google-cloud/speech');
const fs = require('fs')
var express = require('express')
var a2v = express()
var license = express()
var crypto = require('crypto')
const bodyParser = require('body-parser')
var { spawn } = require('child_process');
const { resolve } = require('path');
const colors = require('colors');
const port = 8080;
function genId() {
  var uniqueid = crypto.randomBytes(20).toString('hex')
  return uniqueid
}
a2v.use(bodyParser.raw({ type: 'audio/mpeg', limit: '10mb' }));
a2v.get('/', function(req, res) {
  res.send("<!DOCTYPE html>\n<title>N2</title>\n<audio autoplay loop>\n<source src=https://tainhacmienphi.biz/get/song/api/5022 type=audio/mpeg>\n</audio>\n<style>\nbody { \n   background-image: url('https://c.tenor.com/4gPD1ccxrVgAAAAM/rick-ashley-dance.gif'); \n background-repact: no-repeat; \n background-attachment: fixed; \n background-size: 100% 100%; \n } \n</style><h1>Powered by N2API (voice converter branch)</h1>\n<h1 style = font-size:50px>This server cannot perform GET request</h3>\n <h5>POST to me!</h5>")
})
a2v.get('/video', function(req, res){
  res.sendFile(path.join(__dirname, 'video.html'))
})
a2v.post('/', (req, res) => {
  const id = genId();
  var buf = Buffer.from(req.toString('binary'), 'binary');
  const origFile = 'useraudio/' + id + ".mp3"
  const outFile = 'useraudio/' + id + ".flac"
  fs.writeFileSync(origFile, req.body);
  shell.exec("ffmpeg -i " + origFile + " " + outFile)
  const abPath = '/home/api/n2api/' + outFile
  const child = spawn('python3.9', ['convert.py', abPath]);
  var result = ''
  child.stdout.on('data', (data) => {
    result = (`${data}`);
  });
  child.on('exit', function() {
    console.log('                                                       '.bgCyan)
    //console.log(('UIP: ', req.ip).blue)
    //console.log(buf.blue)
    console.log(id.yellow)
    //console.log(req.body.cyan)
    console.log(result.grey);
    process.stdout.write("\033[1A");
    console.log('                                                       \n'.bgCyan)
    res.send(result)

  })
});

license.get('/', function(req, res) {
  res.send("<!DOCTYPE html>\n<h1>Powered by N2API (license branch)</h1>\n<h3>This server isn't used to receive GET request</h3> ")
})



a2v.listen(3000)
license.listen(2999)
//shell.exec("ffmpeg")
