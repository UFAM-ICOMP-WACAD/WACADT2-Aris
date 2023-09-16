const http = require("node:http");
const fs = require("fs");

if (process.argv.length < 3)
{
    throw new Error("Número de argumentos inválidos");
}


const PORT = process.env.PORT ?? 5151;
const dir = process.argv[2];

const server = http.createServer(function (req,res) {
    res.writeHead(200, {"Content-Type" : "text/html;charset=utf-8"});
    fs.readdir(dir, (error, files) => {
        if (error) throw new Error(error);
        files.forEach(file => {
            res.write(`<p>${file}<p>`);
        });
        res.end();
    })
});

server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`)
})