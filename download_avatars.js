var request = require("request");
var token = require("./secrets");
var fs = require("fs");

console.log("Welcome to the GitHub Avatar Downloader!");

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      "User-Agent": "request",
      "Authorization": `token ${token.GITHUB_TOKEN}`
    }
  };

  request(options, function(err, res, body) {
    var info = JSON.parse(body);
    //console.log(avatarurl)
    cb(err, info);
  });

}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode, response.statusMessage);
       })
       .pipe(fs.createWriteStream(filePath));
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
  result.forEach(function(x){
    downloadImageByURL(x.avatar_url, `avatars/${x.login}.jpg`);
  })
});
