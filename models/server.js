const express = require('express');
const cors = require('cors');
const spawn = require('child_process').spawn;

const PythonShell = require('python-shell');
//import {PythonShell} from 'python-shell';

class Server {
    constructor(){
        console.log('Servidor en el puerto constructor');

        this.app = express();
        this.port = process.env.PORT || 5000;
        this.paths = {
            authorization: '/v1/authorization/',
            updateRequest: '/v1/updateRequest',
            riskLevel: '/v1/riskLevel',
            response: '/v1/response'
        };
        this.middlewares();
        this.routes();
    }
    middlewares(){
        console.log('Servidor en el puerto middlewares');

        this.app.use(cors());
        this.app.use(express.json());
    }
    routes(){
        console.log('Servidor en el puerto routes');

        this.app.use(this.paths.authorization, require('../routes/login'));
        this.app.use(this.paths.updateRequest, require('../routes/updateRequest'));
        this.app.use(this.paths.riskLevel, require('../routes/riskLevel'));
        this.app.use(this.paths.response, require('../routes/response'));
    }
    listen(){
        /*
    const spawn = require('child_process').spawn
//    const pythonProcess = spawn("python", ["C:\\Users\\EsdrasGuzman\\Desktop\\Risk2023128\\apiNodeClear\\models\\script_python.py"])

const pythonProcess = spawn("python", [".\\python\\risk.py  ","\"'215afakhjda76382904','3265709.0','9048689.0','0',1.45,'0','484','MSI','3','45255.6527893519','CHIP','PB452544','[BZP173]UTS_8457239_BR','BANREGIO_TPV','4000123412341230','2024','12','7012334455','PAGO TACOS','TINTORERIA 1','SALE','402766','US','32750','Longwood','FL','CREDIT','MasterCard','5399','00','PRE','0','123.45','josele@gmail.com','Josele','Cruz','PIN','12345566'\""])

    let pythonResponse = ""
    pythonProcess.stdout.on('data', function(data) {
	    pythonResponse += data.toString()
      let data1 =data.toString();
//data1=data1.replace("tensor","").replace("(","").replace(")","");
//data1=data1.substring(1,data1.length-3)
        console.log(" node 1.0  "+data1)
    })
    pythonProcess.stdout.on('end', function(data) {
  })


pythonProcess.stdin.write('backendi')
pythonProcess.stdin.end()*/
        this.app.listen(this.port, () => {
            console.log('Servidor en el puerto', this.port);
        });
    }
}

module.exports = Server;