var streamToString = function(stream){
  var promise = new Promise((resolve, reject) => {
    var chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk.toString('utf8')))
          .on('end', () => resolve(chunks.join('')))
          .on('error', reject);
  });
  return promise;
};

exports.getKonfigData = function(spielerLocation, fs) {
  var dataReadStream = fs.createReadStream(spielerLocation);
  var data = streamToString(dataReadStream).then(JSON.parse);
  return data;
};
