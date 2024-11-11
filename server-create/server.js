// const http = require("http");

// //port

// const port = 8000;

// const reqresData = (req, res) =>{
//     res.end("this is my first server");
// }

// const server = http.createServer(reqresData);

// server.listen(port, (req, res) =>{
//    console.log("server is running at port",port);
// });

const http = require("http");
const fs = require("fs");

const port = 8088;

const reqresData =(req, res) =>{
    // res.end("This is my first server..!");
    console.log(req.url);

    let fileName ="";
    switch(req.url){
       case "/" :
        fileName= "./fs.html";
        break;
        case "/home" :
        fileName= "./home.html";
        break;
    }

    fs.readFile(fileName,(err, result) =>{
      if(!err){
        res.end(result);
      }
    });
}

const server = http.createServer(reqresData);

server.listen(port, (req, res) => {
   console.log("server again startated",port);
});