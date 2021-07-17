const WebSocket = require('ws')
	fs   = require('fs')
const url = 'wss://gateway.speechlab.sg/client/ws/speech?content-type=audio%2Fx-raw%2C+layout%3D%28string%29interleaved%2C+rate%3D%28int%2916000%2C+format%3D%28string%29S16LE%2C+channels%3D%28int%291&accessToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFjYWN0ZWNoQHNwZWVjaGxhYi5zZyIsInJvbGUiOiJ1c2VyIiwibmFtZSI6IkFjYWN0ZWNoIiwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTYyNTgzMDEzMywibmJmIjoxNjI1ODMwMTMzLCJleHAiOjE2Mjg0MjIxMzMsImlzcyI6Imh0dHBzOi8vZ2F0ZXdheS5zcGVlY2hsYWIuc2ciLCJzdWIiOiI2MGI2ZjNhODlkZGEzMjAwMmQ0YTIwOGIifQ.IF2i8ZG0Mcn4akYmQcbsADwo8KH_rTpgJty1Vt1oa4YSbYI2ZKUdbuItp-QNAAh-vboLd_d9K-45CzTJJCtl9Gff957ZLvxQsw2hfDSLE6haDUP9ECS86ATfl62KprvZdVcJIWKDzoxBuidrpQCLhsK1-AJCxsycfvajoipRax6WoJFKcO-j5BfUCA_Qb7jljMrn435nBLoLR0HKMQrL9I-9ylXCWiKuw_zhtx-Gk3cMDByOzb59jphhVn0drixIZie0lxTT5ZoJ2CekgAxsL7q8bGuAlZK5TXrzm7GFOjO2562R3pDkQKMBK6WPb3XtRAUoXF_ngvUHEOUljOjwRw&model=None'
const connection = new WebSocket(url)
 
connection.onopen = () => {
  console.log('connectin opened')
  //response = fs.createReadStream('audio.wav')
  //console.log(response)
   const path = 'audio.wav'
  //fs.readFile(path, (err, data) => {
  //	console.log(typeof data)
   // connection.send(data) 
//});

 //var readStream = fs.createReadStream(path);
  var readStream = fs.createReadStream(path, {'flags': 'r', 'mode': 0666, 'bufferSize': 2 * 1024});
  readStream.on('data', function(data) {
        console.log(data);
        console.log('sending chunk of data')
        connection.send(data);
    });
    
  readStream.on('end',function() {
   console.log('end ----------- ');
});


}
connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}
 
connection.onmessage = (e) => {
  console.log(e.data)
}


