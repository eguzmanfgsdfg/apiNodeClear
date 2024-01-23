const jtw = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');
const spawn = require('child_process').spawn;
let inicializa=false;
const PythonShell = require('python-shell');

const generarJWT = (sessionKey = '', uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { sessionKey, uid };
        jtw.sign(payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '30d' },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se puedo generar el token');
                } else {
                    resolve(token);
                }
            });
    });
};


const isString = (str = '') => {
    const pattern = new RegExp(/^[A-Za-z\s]+$/g);
    return pattern.test(str);
};

const isInt = (str = '') => {
    const pattern = new RegExp(/^[0-9\s]+$/g);
    return pattern.test(str);
};

const isStringOrInt = (str = '') => {
    const pattern = new RegExp(/^[A-Za-z0-9\s]+$/g);
    return pattern.test(str);
};
const isCurrency = (str = '') => {
    const pattern = new RegExp(/^[0-9]{1,7}\.[0-9]{1,5}$/);
    return pattern.test(str);
};

;
const isEmail = (str = '') => {
    const pattern = new RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
    return pattern.test(str);
};

const isDateTime = (str = '') => {
    console.log("date asas [" + Date.parse(str, "dd/MM/yyyy HH:mm:ss") +"]");
    return  Date.parse(str, "dd/MM/yyyy HH:mm:ss")
};

const python = async (url='',str = '') => {
    //const queryPostgreSQL  = async (queryText) => {
    const spawn = require('child_process').spawn
    const pythonProcess =  spawn("python", [url,str])

    let pythonResponse = ""
     /*  pythonProcess.stdout.on('data', function( data) {
	    pythonResponse =  data.toString()
      let data1 =data.toString();
        console.log(" node 1.0 *** "+pythonResponse+'***')
    })
*/
    return new Promise((resolve, reject) => (
        pythonProcess.stdout.on('data', function( data) {
            pythonResponse =  data.toString()
          let data1 =data.toString();
            console.log(" node 1.0 *** "+pythonResponse+'***')
            resolve(pythonResponse)
        })   
    /*    pythonProcess.stdin.end((pythonResponse) => (
           reject("description++++" ) 
        ))*/
    ));
    pythonProcess.stdout.on('end', function(data) {
    })

     pythonProcess.stdin.write('backendi')
        pythonProcess.stdin.end()    
       
    return   pythonResponse;
};

const init = () => {
    console.log("++++++++++++++++++++++++++++++"+inicializa);
    inicializa=true;
    
    console.log("++++++++++++++++++++++++++++++"+inicializa);
};
module.exports = {
    isStringOrInt   ,
    isString,
    isInt ,
    isCurrency,
    generarJWT,
    isDateTime,
    isEmail,
    python,
    init
}

