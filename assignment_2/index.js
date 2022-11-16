var fs = require("fs");
var http = require("http");
var server = http.createServer(function (req, res) {
  if (req.url == "/") {
    let data = fs.readFileSync("home.html", "utf8");
    res.end(data);
  } else if (req.url == "/courses") {
    let data = fs.readFileSync("courses.html", "utf8");
    res.end(data);
  } else if (req.url == "/dashboard") {
    let data = fs.readFileSync("dashboard.html", "utf8");
    res.end(data);
  } else if (req.url == "/login") {
    let data = fs.readFileSync("login.html", "utf8");
    res.end(data);
  } else {
    let data = fs.readFileSync("404.html", "utf8");
    res.end(data);
  }
});
server.listen(5000);
console.log("Server Run Success");
