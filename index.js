
const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec } = require('child_process');

const { io } = require("socket.io-client");

console.log(
`
   __     __            ______     ______     __   __     __   __     ______     ______     ______   ______     ______    
  /\\ \\   /\\ \\          /\\  ___\\   /\\  __ \\   /\\ "-.\\ \\   /\\ "-.\\ \\   /\\  ___\\   /\\  ___\\   /\\__  _\\ /\\  __ \\   /\\  == \\   
 _\\_\\ \\  \\ \\ \\____     \\ \\ \\____  \\ \\ \\/\\ \\  \\ \\ \\-.  \\  \\ \\ \\-.  \\  \\ \\  __\\   \\ \\ \\____  \\/_/\\ \\/ \\ \\ \\/\\ \\  \\ \\  __<   
/\\_____\\  \\ \\_____\\     \\ \\_____\\    \\ \\_____\\  \\ \\_\\"\\_\\  \\ \\_\\"\\_\\  \\ \\_____\\  \\ \\_____\\    \\ \\_\\  \\ \\_____\\  \\ \\_\\ \\_\\ 
\\/_____/   \\/_____/      \\/_____/   \\/_____/   \\/_/ \\/_/   \\/_/ \\/_/   \\/_____/   \\/_____/     \\/_/   \\/_____/   \\/_/ /_/
`
)

const socket = io("ws://localhost:4000")

exec(`jl list`,  (error, stdout, stderr) => {
    socket.emit("add-impressoras", stdout.split("\r\n"))
})

socket.on('obter-impressoras', () => {
    console.log('oie')
    exec(`jl list`,  (error, stdout, stderr) => {
        socket.emit("add-impressoras", stdout.split("\r\n"))
    })
})

socket.on('printer', (nome, texto) => {
    const tempFileName = path.join(os.tmpdir(), 'jlPrinterFile.jl');

    fs.writeFileSync(tempFileName, texto, 'utf8');

    exec(`jl print 58 210 ${tempFileName} --print='${nome}'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erro ao executar o comando: ${error.message}`);
            return;
        }

        if (stderr) {
            console.error(`Erro na saída do comando: ${stderr}`);
            return;
        }
        fs.unlinkSync(tempFileName);
    });
})

