const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 8080;

http.createServer((req, res) => {
    switch (req.url){
        case "/":
            req.url = "index.html";
            break;
        case "/cars":
            req.url = "searchcar.html";
            break;
    }

    let path = "public/" + req.url;
    fs.readFile(path, (err, data) => {
        res.writeHead(200);
        res.end(data);
    });

})
.listen(port, 'localhost', () => {
    console.log("Server Berhasil Bekerja, KLik http://localhost:%d", port);
});
