var request = require("request");
var token = require("./secrets");

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
    info.forEach(function(x){
      console.log(x.avatar_url);
    })
    cb(err, info);
  });

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  //console.log("Result:", result);
});
