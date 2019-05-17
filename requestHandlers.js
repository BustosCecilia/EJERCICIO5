var fs = require('fs');
var querystring = require("querystring");
var http = require("http");
var url = require("url");
var XMLHttpRequest = require('w3c-xmlhttprequest').XMLHttpRequest;


function iniciar(response, postData) {
    console.log("Manipulador de peticion 'inicio' fue llamado.");
    var f = 'index.html';
    fs.readFile(f,function (err, data) {
        if(err){
            response.writeHead(404,{'Content-type':'text/html'});
            return response.end()
        }else{
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();

        }
    });
}

function subir(response, dataPosteada) {
    console.log("Manipulador de peticion 'subir' fue llamado.");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("Tu enviaste el texto: : " +
        querystring.parse(dataPosteada)["sitios"]);

    var category = querystring.parse(dataPosteada)["categorias"];
    var filas =querystring.parse(dataPosteada)["filas"];
    var columnas = querystring.parse(dataPosteada)["columnas"];
    var sitios = querystring.parse(dataPosteada)["sitios"];

    console.log(category);
    console.log(filas);
    console.log(columnas);
    console.log(sitios);


    var request = new XMLHttpRequest();
    request.open('GET', 'https://api.mercadolibre.com/trends/'+ sitios, true);
    request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                data.forEach( thends=>{
                    response.write(thends.keyword);
                });
            }
            response.end();
        };

    request.send();



}
exports.iniciar = iniciar;
exports.subir = subir;