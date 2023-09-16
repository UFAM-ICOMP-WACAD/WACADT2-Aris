import http from "http";
import fs from "fs";
import { createLink } from './util.js';

if (process.argv.length < 3) {
  throw new Error('Número de parâmetros inválido');
}
const PORT = process.env.PORT ?? 6767;
const dir = process.argv[2];
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
  if (request.url === '/') {
    fs.readdir(dir, (err, files) => {
      if (err) throw new Error(err);
      files.forEach((file) => response.write(createLink(dir,file)));
      response.end();
    });
  } else {
    const filename = request.url.substring(1);
    fs.readFile(filename, 'utf-8', (err, data) => {
      //if (err) throw new Error(err);
      response.write(`<a href="/">Voltar</a><br><br>${data}`);
      response.end();
    });
  }
});
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});